import { StorableEvent } from 'event-sourcing-nestjs';

export class InscriptionWasCreated extends StorableEvent {
  eventAggregate = 'inscription';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly driverId: string,
    public readonly raceId: string
  ) {
    super();
  }
}
