import { IQuery } from '@nestjs/cqrs';

export class GetCompetitionRankingQuery implements IQuery {
  constructor(public readonly id: string) {}
}
