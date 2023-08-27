import { Nullable } from '@gpseries/domain';

import { TeamId } from '../../../team/domain';
import { Driver, DriverId, Name } from '../model';

export interface DriverRepository {
  create(driver: Driver): void;
  findByNameAndTeam(name: Name, teamId: TeamId): Promise<Nullable<Driver>>;
  findOne(id: DriverId): Promise<Nullable<Driver>>;
  find(): Promise<Driver[]>;
  findByTeam(id: TeamId): Promise<Driver[]>;
}

export const driverRepository = 'driverRepository';
