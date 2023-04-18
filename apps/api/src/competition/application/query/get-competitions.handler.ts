import { CompetitionDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CompetitionRepository, competitionRepository } from '../../domain';
import { GetCompetitionsQuery } from './get-competitions.query';

@QueryHandler(GetCompetitionsQuery)
export class GetCompetitionsHandler
  implements IQueryHandler<GetCompetitionsQuery> {
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetCompetitionsQuery
  ): Promise<Nullable<Array<CompetitionDTO>>> {
    const competitions = await this.repository.findAll();

    return competitions.map(competition => ({
      id: competition.id.value,
      ownerId: competition.ownerId.value,
      name: competition.name.value,
      description: competition.description.value,
      races: []
    }));
  }
}
