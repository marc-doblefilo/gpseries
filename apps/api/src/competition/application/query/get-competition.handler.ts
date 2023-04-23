import { CompetitionDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../domain';
import { GetCompetitionQuery } from './get-competition.query';

@QueryHandler(GetCompetitionQuery)
export class GetCompetitionHandler
  implements IQueryHandler<GetCompetitionQuery> {
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {}

  async execute(query: GetCompetitionQuery): Promise<Nullable<CompetitionDTO>> {
    const id = CompetitionId.fromString(query.id);

    const competition = await this.repository.find(id);
    if (!competition) {
      throw CompetitionNotFound.with(id);
    }

    return {
      id: competition.id.value,
      ownerId: competition.ownerId.value,
      name: competition.name.value,
      description: competition.description.value,
      races: competition.races.map(race => {
        return {
          id: race.id.value,
          name: race.name.value,
          date: race.date
        };
      })
    };
  }
}
