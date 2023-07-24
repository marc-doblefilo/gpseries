import { ICommand } from '@nestjs/cqrs';

export class AddRaceCommand implements ICommand {
  constructor(
    public readonly competitionId: string,
    public readonly name: string,
    public readonly date: Date
  ) {}
}
