import { ICommand } from '@nestjs/cqrs';

export class CreateIncidentCommand implements ICommand {
  constructor(
    public readonly description: string,
    public readonly driversId: string[],
    public readonly raceId: string
  ) {}
}
