import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
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
}
