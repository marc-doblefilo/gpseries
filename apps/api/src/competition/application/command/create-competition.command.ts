import { ICommand } from '@nestjs/cqrs';

export class CreateCompetitionCommand implements ICommand {
  constructor(
    public readonly ownerId: string,
    public readonly name: string,
    public readonly description: string
  ) {}
}
