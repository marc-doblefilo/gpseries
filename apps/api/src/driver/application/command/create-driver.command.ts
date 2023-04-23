import { ICommand } from '@nestjs/cqrs';

export class CreateDriverCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly competitionId: string
  ) {}
}
