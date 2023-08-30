import { IQuery } from '@nestjs/cqrs';

export class GetIncidentsByCompetitionQuery implements IQuery {
  constructor(public readonly competitionId: string) {}
}
