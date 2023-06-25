import { IQuery } from '@nestjs/cqrs';

export class GetTeamsByCompetitionQuery implements IQuery {
  public constructor(public readonly competitionId: string) {}
}
