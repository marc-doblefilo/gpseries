import { ICommand } from '@nestjs/cqrs';

interface Race {
  name: string;
  date: Date;
}
export class UpdateCompetitionCommand implements ICommand {
  constructor(
    public readonly competitionId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly races: Array<Race>
  ) {}
}
