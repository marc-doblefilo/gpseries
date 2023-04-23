import { StorableEvent } from 'event-sourcing-nestjs';

export class RaceWasAdded extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly raceId: string,
    public readonly raceName: string,
    public readonly raceDate: Date
  ) {
    super();
  }
}
