import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { Name } from './name';
import { TeamId } from './team-id';

export class Team extends AggregateRoot {
  private _id: TeamId;
  private _name: Name;
  private _ownerId: UserId;
  private _competitionId: CompetitionId;

  private constructor() {
    super();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get ownerId() {
    return this._ownerId;
  }

  get competitionId() {
    return this._competitionId;
  }
}
