import { ICommand } from '@nestjs/cqrs';

export class CreateDriverCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly competitionId: string
  ) {}
}
