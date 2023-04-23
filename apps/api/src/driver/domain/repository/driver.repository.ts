import { Nullable } from '@gpseries/domain';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { Driver } from '../model';

export interface DriverRepository {
  create(driver: Driver): void;
  findByUserAndCompetition(
    userId: UserId,
    competitionId: CompetitionId
  ): Promise<Nullable<Driver>>;
}

export const driverRepository = 'driverRepository';
