import { IQuery } from '@nestjs/cqrs';

export class GetTeamQuery implements IQuery {
  public constructor(public readonly id: string) {}
}
