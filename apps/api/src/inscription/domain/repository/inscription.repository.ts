import { Nullable } from '@gpseries/domain';

import { RaceId } from '../../../competition/domain';
import { DriverId } from '../../../driver/domain';
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
