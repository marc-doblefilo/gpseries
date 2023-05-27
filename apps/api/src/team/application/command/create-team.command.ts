import { ICommand } from '@nestjs/cqrs';

export class CreateTeamCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly ownerId: string,
    public readonly competitionId: string
  ) {}
}
