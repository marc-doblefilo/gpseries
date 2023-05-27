import { AggregateRoot } from '@nestjs/cqrs';

import { TeamId } from '../../../team/domain';
import { DriverWasCreated } from '../event/driver-was-created.event';
import { DriverId } from './driver-id';
import { Name } from './name';
import { Points } from './points';

export class Driver extends AggregateRoot {
  private _id: DriverId;
  private _name: Name;
  private _teamId: TeamId;
  private _points: Points;

  private constructor() {
    super();
  }

  public static add(id: DriverId, name: Name, teamId: TeamId): Driver {
    const driver = new Driver();

    driver.apply(new DriverWasCreated(id.value, name.value, teamId.value));

    return driver;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get teamId(): TeamId {
    return this._teamId;
  }

  get points(): Points {
    return this._points;
  }

  private onDriverWasCreated(event: DriverWasCreated) {
    this._id = DriverId.fromString(event.id);
    this._name = Name.fromString(event.name);
    this._teamId = TeamId.fromString(event.teamId);
    this._points = Points.fromNumber(0);
  }
}
