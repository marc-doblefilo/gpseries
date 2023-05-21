import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { DriverWasCreated } from '../event/driver-was-created.event';
import { DriverId } from './driver-id';
import { Name } from './name';
import { Points } from './points';

export class Driver extends AggregateRoot {
  private _id: DriverId;
  private _name: Name;
  private _competitionId: CompetitionId;
  private _points: Points;

  private constructor() {
    super();
  }

  public static add(
    id: DriverId,
    name: Name,
    competitionId: CompetitionId
  ): Driver {
    const driver = new Driver();

    driver.apply(
      new DriverWasCreated(id.value, name.value, competitionId.value)
    );

    return driver;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get points(): Points {
    return this._points;
  }

  private onDriverWasCreated(event: DriverWasCreated) {
    this._id = DriverId.fromString(event.id);
    this._name = Name.fromString(event.name);
    this._competitionId = CompetitionId.fromString(event.competitionId);
    this._points = Points.fromNumber(0);
  }
}
