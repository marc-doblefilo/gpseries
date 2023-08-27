import { StorableEvent } from 'event-sourcing-nestjs';

export class RaceWasDeleted extends StorableEvent {
  eventAggregate = 'race';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
