import { Nullable } from '@gpseries/domain';

import { RaceId } from '../../../competition/domain';
import { DriverId } from '../../../driver/domain';
import { Inscription } from '../model';

export interface InscriptionRepository {
  create(inscription: Inscription): void;
  findByDriverAndRace(
    driverId: DriverId,
    raceId: RaceId
  ): Promise<Nullable<Inscription>>;
}

export const inscriptionRepository = 'inscriptionRepository';
