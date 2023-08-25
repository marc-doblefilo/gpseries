import { Nullable } from '@gpseries/domain';

import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import { Inscription, InscriptionId } from '../model';

export interface InscriptionRepository {
  create(inscription: Inscription): void;
  update(inscription: Inscription): void;
  findByDriverAndRace(
    driverId: DriverId,
    raceId: RaceId
  ): Promise<Nullable<Inscription>>;
  findByRace(raceId: RaceId): Promise<Inscription[]>;
  find(id: InscriptionId): Promise<Nullable<Inscription>>;
}

export const inscriptionRepository = 'inscriptionRepository';
