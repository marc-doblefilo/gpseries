import { NotFoundError } from '@gpseries/domain';

import { DriverId } from '../model';

export class DriverNotFound extends NotFoundError {
  public static with(id: DriverId): DriverNotFound {
    return new DriverNotFound(`Driver with ID <${id.value}> not found`);
  }
}
