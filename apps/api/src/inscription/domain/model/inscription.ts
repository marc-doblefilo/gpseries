import { Nullable } from '@gpseries/domain';
import { AggregateRoot } from '@nestjs/cqrs';

import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import { ResultAdded } from '../event';
import { InscriptionWasCreated } from '../event/inscription-was-created.event';
import { InscriptionId } from './inscription-id';
import { Position } from './position';

export class Inscription extends AggregateRoot {
  private _id: InscriptionId;
  private _driverId: DriverId;
  private _raceId: RaceId;
  private _position: Nullable<Position>;

  private constructor() {
    super();
  }

  public static add(args: {
    id: InscriptionId;
    driverId: DriverId;
    raceId: RaceId;
  }) {
    const inscription = new Inscription();

    inscription.apply(
      new InscriptionWasCreated(
        args.id.value,
        args.driverId.value,
        args.raceId.value
      )
    );

    return inscription;
  }

  get id(): InscriptionId {
    return this._id;
  }

  get raceId(): RaceId {
    return this._raceId;
  }

  get driverId(): DriverId {
    return this._driverId;
  }

  get position(): Nullable<Position> {
    return this._position;
  }

  addResult(position: Position) {
    this.apply(new ResultAdded(this.id.value, position.value));
  }

  private onInscriptionWasCreated(event: InscriptionWasCreated) {
    this._id = InscriptionId.fromString(event.id);
    this._driverId = DriverId.fromString(event.driverId);
    this._raceId = RaceId.fromString(event.raceId);
    this._position = null;
  }

  private onResultAdded(event: ResultAdded) {
    this._position = Position.fromPrimitive(event.position);
  }
}
