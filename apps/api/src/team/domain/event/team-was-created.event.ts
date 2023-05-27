import { StorableEvent } from 'event-sourcing-nestjs';

export class TeamWasCreated extends StorableEvent {
  eventAggregate = 'team';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly competitionId: string,
    public readonly name: string
  ) {
    super();
  }
}
