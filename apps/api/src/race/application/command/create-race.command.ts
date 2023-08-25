import { ICommand } from '@nestjs/cqrs';

export class CreateRaceCommand implements ICommand {
  constructor(
    public readonly competitionId: string,
    public readonly name: string,
    public readonly date: Date
  ) {}
}
