import { StorableEvent } from 'event-sourcing-nestjs';

export class DriverWasCreated extends StorableEvent {
  eventAggregate = 'driver';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly competitionId: string
  ) {
    super();
  }
}
