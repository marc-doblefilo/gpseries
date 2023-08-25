import { NotFoundError } from '@gpseries/domain';

import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';

export class InscriptionNotFound extends NotFoundError {
  public static with(driverId: DriverId, raceId: RaceId): InscriptionNotFound {
    return new InscriptionNotFound(
      `Driver with ID <${driverId.value}> has none inscription for race with ID <${raceId.value}>`
    );
  }
}
