import { CompetitionDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RaceRepository, raceRepository } from '../../../race/domain';
import { CompetitionRepository, competitionRepository } from '../../domain';
import { GetCompetitionsQuery } from './get-competitions.query';

@QueryHandler(GetCompetitionsQuery)
export class GetCompetitionsHandler
  implements IQueryHandler<GetCompetitionsQuery>
{
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository,
    @Inject(raceRepository) private raceRepository: RaceRepository
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetCompetitionsQuery
  ): Promise<Nullable<Array<CompetitionDTO>>> {
    const competitions = await this.repository.findAll();

    return await Promise.all(
      competitions.map(async competition => {
        const races = await this.raceRepository.findByCompetition(
          competition.id
        );

        return {
          id: competition.id.value,
          ownerId: competition.ownerId.value,
          name: competition.name.value,
          description: competition.description?.value || null,
          driversPerTeam: competition.driversPerTeam.value,
          pointsSystem: competition.pointsSystem.map(points => ({
            position: points.position,
            points: points.points
          })),
          races: races.map(race => {
            return {
              id: race.id.value,
              name: race.name.value,
              date: race.date
            };
          })
        };
      })
    );
  }
}
