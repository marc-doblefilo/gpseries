import { CompetitionRankingDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DriverRepository, driverRepository } from '../../../driver/domain';
import {
  InscriptionRepository,
  inscriptionRepository
} from '../../../inscription/domain';
import { RaceRepository, raceRepository } from '../../../race/domain';
import {
  TeamNotFound,
  TeamRepository,
  teamRepository
} from '../../../team/domain';
import {
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository
} from '../../domain';
import { GetCompetitionRankingQuery } from './get-competition-ranking-query';

@QueryHandler(GetCompetitionRankingQuery)
export class GetCompetitionRankingHandler
  implements IQueryHandler<GetCompetitionRankingQuery>
{
  private readonly competitionFinder: CompetitionFinder;

  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository,
    @Inject(raceRepository) private raceRepository: RaceRepository,
    @Inject(driverRepository) private driverRepository: DriverRepository,
    @Inject(teamRepository) private teamRepository: TeamRepository,
    @Inject(inscriptionRepository)
    private inscriptionRepository: InscriptionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(repository);
  }

  async execute(
    query: GetCompetitionRankingQuery
  ): Promise<CompetitionRankingDTO> {
    const id = CompetitionId.fromString(query.id);

    const competition = await this.competitionFinder.findOrThrow(id);

    const races = await this.raceRepository.findByCompetition(id);

    const orderedRaces = races.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const teams = await this.teamRepository.findByCompetition(id);

    const driversPromises = teams.map(team =>
      this.driverRepository.findByTeam(team.id)
    );
    const drivers = (await Promise.all(driversPromises)).flat();

    const inscriptionsPromises = races.map(race =>
      this.inscriptionRepository.findByRace(race.id)
    );
    const inscriptions = (await Promise.all(inscriptionsPromises)).flat();

    const driversPoints = drivers.map(driver => {
      let calculatedPoints = 0;

      const driverInscriptions = inscriptions.filter(
        ins => ins.driverId.value === driver.id.value
      );

      driverInscriptions.forEach(inscription => {
        const correspondingPosition = competition.pointsSystem.find(
          pp => pp.position === inscription.position?.value
        );

        if (correspondingPosition) {
          calculatedPoints += correspondingPosition.points;
        }
      });

      return {
        driver,
        points: calculatedPoints
      };
    });

    const driversDto = drivers.map(driver => {
      const driverInscriptions = inscriptions.filter(
        ins => ins.driverId.value === driver.id.value
      );

      const team = teams.find(team => team.id.value === driver.teamId.value);

      if (!team) {
        throw TeamNotFound.with(driver.teamId);
      }

      return {
        driver: {
          id: driver.id.value,
          name: driver.name.value,
          teamId: driver.teamId.value
        },
        team: {
          id: team.id.value,
          name: team.name.value,
          ownerId: team.ownerId.value,
          competitionId: team.competitionId.value
        },
        inscriptions: driverInscriptions.map(inscription => ({
          id: inscription.id.value,
          driverId: inscription.driverId.value,
          raceId: inscription.raceId.value,
          position: inscription.position?.value
        })),
        points:
          driversPoints.find(driverpoint => driverpoint.driver.id === driver.id)
            ?.points || 0
      };
    });

    return {
      competition: {
        id: competition.id.value,
        ownerId: competition.ownerId.value,
        name: competition.name.value,
        description: competition.description?.value || null,
        driversPerTeam: competition.driversPerTeam.value,
        pointsSystem: competition.pointsSystem.map(points => ({
          position: points.position,
          points: points.points
        })),
        races: orderedRaces.map(race => {
          return {
            id: race.id.value,
            name: race.name.value,
            date: race.date
          };
        })
      },
      drivers: driversDto.sort((a, b) => b.points - a.points)
    };
  }
}
