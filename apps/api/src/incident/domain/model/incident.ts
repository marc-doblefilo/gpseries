import { AggregateRoot } from '@nestjs/cqrs';

import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import { IncidentWasCreated } from '../event';
import { IncidentDescription } from './incident-description';
import { IncidentId } from './incident-id';

export class Incident extends AggregateRoot {
  private _id: IncidentId;
  private _raceId: RaceId;
  private _description: IncidentDescription;
  private _driversId: DriverId[];

  private constructor() {
    super();
  }

  public static add(
    id: IncidentId,
    raceId: RaceId,
    description: IncidentDescription,
    drivers: DriverId[]
  ) {
    const incident = new Incident();

    incident.apply(
      new IncidentWasCreated(
        id.value,
        raceId.value,
        description.value,
        drivers.map(driver => driver.value)
      )
    );

    return incident;
  }

  get id(): IncidentId {
    return this._id;
  }

  get description(): IncidentDescription {
    return this._description;
  }

  get driversId(): DriverId[] {
    return this._driversId;
  }

  get raceId(): RaceId {
    return this._raceId;
  }

  private onIncidentWasCreated(event: IncidentWasCreated) {
    this._id = IncidentId.fromString(event.id);
    this._raceId = RaceId.fromString(event.raceId);
    this._description = IncidentDescription.fromString(event.description);
    this._driversId = event.drivers.map(driver => DriverId.fromString(driver));
  }
}
