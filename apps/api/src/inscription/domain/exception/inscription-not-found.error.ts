import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';

export class InscriptionAlreadyExists extends Error {
  public static with(
    driverId: DriverId,
    raceId: RaceId
  ): InscriptionAlreadyExists {
    return new InscriptionAlreadyExists(
      `Driver with ID <${driverId.value}> is already registered in race with ID <${raceId.value}>`
    );
  }
}
