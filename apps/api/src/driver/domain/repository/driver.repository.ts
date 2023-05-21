import { Nullable } from '@gpseries/domain';

import { CompetitionId } from '../../../competition/domain';
import { Driver, Name } from '../model';

export interface DriverRepository {
  create(driver: Driver): void;
  findByNameAndCompetition(
    name: Name,
    competitionId: CompetitionId
  ): Promise<Nullable<Driver>>;
  findAll(): Promise<Driver[]>;
}

export const driverRepository = 'driverRepository';
