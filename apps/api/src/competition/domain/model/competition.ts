import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { CompetitionWasCreated } from '../event/competition-was-created.event';
import { CompetitionDescription } from './competition-description';
import { CompetitionId } from './competition-id';
import { Name } from './name';
import { Race } from './race';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _ownerId: UserId;
  private _name: Name;
  private _description: CompetitionDescription;
  private _races: Array<Race>;
  private _closed?: Date;
  private _deleted?: Date;

  private constructor() {
    super();
  }

  public static add(
    id: CompetitionId,
    ownerId: UserId,
    name: Name,
    description: CompetitionDescription
  ) {
    const competition = new Competition();

    competition.apply(
      new CompetitionWasCreated(
        id.value,
        ownerId.value,
        name.value,
        description.value
      )
    );

    return competition;
  }

  get id(): CompetitionId {
    return this._id;
  }

  get ownerId(): UserId {
    return this._ownerId;
  }

  get name(): Name {
    return this._name;
  }

  get description(): CompetitionDescription {
    return this._description;
  }

  get races(): Array<Race> {
    return this._races;
  }

  private onCompetitionWasCreated(event: CompetitionWasCreated) {
    this._id = CompetitionId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._name = Name.fromString(event.name);
    this._description = CompetitionDescription.fromString(event.description);

    this._closed = undefined;
    this._deleted = undefined;
  }
}
