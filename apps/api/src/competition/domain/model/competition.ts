import { Nullable } from '@gpseries/domain';
import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { CompetitionWasCreated } from '../event/competition-was-created.event';
import { CompetitionDescription } from './competition-description';
import { CompetitionId } from './competition-id';
import { DriversPerTeam } from './drivers-per-team';
import { Name } from './name';
import { Points } from './points';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _ownerId: UserId;
  private _name: Name;
  private _description: Nullable<CompetitionDescription>;
  private _driversPerTeam: DriversPerTeam;
  private _pointsSystem: Points[] = Points.default();
  private _closed?: Date;
  private _deleted?: Date;

  private constructor() {
    super();
  }

  public static add(
    id: CompetitionId,
    ownerId: UserId,
    name: Name,
    description: Nullable<CompetitionDescription>,
    driversPerTeam: DriversPerTeam
  ) {
    const competition = new Competition();

    competition.apply(
      new CompetitionWasCreated(
        id.value,
        ownerId.value,
        name.value,
        description?.value || null,
        driversPerTeam.value
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

  get description(): Nullable<CompetitionDescription> {
    return this._description;
  }

  get driversPerTeam(): DriversPerTeam {
    return this._driversPerTeam;
  }

  get pointsSystem(): Points[] {
    return this._pointsSystem;
  }

  private onCompetitionWasCreated(event: CompetitionWasCreated) {
    this._id = CompetitionId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._name = Name.fromString(event.name);
    if (event.description) {
      this._description = CompetitionDescription.fromString(event.description);
    }
    this._driversPerTeam = DriversPerTeam.fromPrimitive(event.driversPerTeam);

    this._closed = undefined;
    this._deleted = undefined;
  }
}
