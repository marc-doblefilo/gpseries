import { IQuery } from '@nestjs/cqrs';

export class GetNextRaceQuery implements IQuery {
  constructor(public readonly competitionId: string) {}
}
