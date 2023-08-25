import { CompetitionDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RaceRepository, raceRepository } from '../../../race/domain';
import {
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository
} from '../../domain';
import { GetCompetitionQuery } from './get-competition.query';

@QueryHandler(GetCompetitionQuery)
export class GetCompetitionHandler
  implements IQueryHandler<GetCompetitionQuery>
{
  private readonly competitionFinder: CompetitionFinder;

  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository,
    @Inject(raceRepository) private raceRepository: RaceRepository
  ) {
    this.competitionFinder = new CompetitionFinder(repository);
  }

  async execute(query: GetCompetitionQuery): Promise<Nullable<CompetitionDTO>> {
    const id = CompetitionId.fromString(query.id);

    const competition = await this.competitionFinder.findOrThrow(id);

    const races = await this.raceRepository.findByCompetition(id);

    const orderedRaces = races.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return {
      id: competition.id.value,
      ownerId: competition.ownerId.value,
      name: competition.name.value,
      description: competition.description?.value || null,
      driversPerTeam: competition.driversPerTeam.value,
      races: orderedRaces.map(race => {
        return {
          id: race.id.value,
          name: race.name.value,
          date: race.date
        };
      })
    };
  }
}
