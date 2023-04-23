import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { DriverWasCreated } from '../event/driver-was-created.event';
import { DriverId } from './driver-id';
import { Points } from './points';

export class Driver extends AggregateRoot {
  private _id: DriverId;
  private _userId: UserId;
  private _competitionId: CompetitionId;
  private _points: Points;

  private constructor() {
    super();
  }

  public static add(
    id: DriverId,
    userId: UserId,
    competitionId: CompetitionId
  ): Driver {
    const driver = new Driver();

    driver.apply(
      new DriverWasCreated(id.value, userId.value, competitionId.value)
    );

    return driver;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get points(): Points {
    return this._points;
  }

  private onDriverWasCreated(event: DriverWasCreated) {
    this._id = DriverId.fromString(event.id);
    this._userId = UserId.fromString(event.userId);
    this._competitionId = CompetitionId.fromString(event.competitionId);
    this._points = Points.fromNumber(0);
  }
}
