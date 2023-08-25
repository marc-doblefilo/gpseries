import { StorableEvent } from 'event-sourcing-nestjs';

export class RaceWasCreated extends StorableEvent {
  eventAggregate = 'race';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly competitionId: string,
    public readonly name: string,
    public readonly date: Date
  ) {
    super();
  }
}
