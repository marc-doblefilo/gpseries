import { StorableEvent } from 'event-sourcing-nestjs';

export class IncidentWasCreated extends StorableEvent {
  eventAggregate = 'incident';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly raceId: string,
    public readonly description: string,
    public readonly drivers: string[]
  ) {
    super();
  }
}
