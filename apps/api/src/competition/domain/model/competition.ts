import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { CompetitionDescription } from './competition-description';
import { CompetitionId } from './competition-id';
import { Name } from './name';
import { Race } from './race';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _ownerId: UserId;
  private _inscribedDrivers: Array<UserId>;
  private _name: Name;
  private _description: CompetitionDescription;
  private _races: Array<Race>;
  private _closed?: Date;
  private _deleted?: Date;

  private constructor() {
    super();
  }
}
