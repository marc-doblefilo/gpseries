import { Nullable } from '@gpseries/domain';

import { TeamId } from '../../../team/domain';
import { Driver, Name } from '../model';

export interface DriverRepository {
  create(driver: Driver): void;
  findByNameAndTeam(name: Name, teamId: TeamId): Promise<Nullable<Driver>>;
  findAll(): Promise<Driver[]>;
}

export const driverRepository = 'driverRepository';
