import { Id } from '@gpseries/domain';
import * as uuid from 'uuid';

export class DriverId extends Id {
  static generate(): DriverId {
    return new DriverId(uuid.v4());
  }

  public static fromString(id: string): DriverId {
    return new DriverId(id);
  }
}
