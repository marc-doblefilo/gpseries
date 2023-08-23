import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasCreated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly driversPerTeam: number
  ) {
    super();
  }
}
