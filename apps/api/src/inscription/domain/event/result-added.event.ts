import { StorableEvent } from 'event-sourcing-nestjs';

export class ResultAdded extends StorableEvent {
  eventAggregate = 'inscription';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly position: number) {
    super();
  }
}
