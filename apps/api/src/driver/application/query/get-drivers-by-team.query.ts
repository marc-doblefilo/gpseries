import { IQuery } from '@nestjs/cqrs';

export class GetDriversByTeamQuery implements IQuery {
  constructor(public readonly teamId: string) {}
}
