import { Nullable } from '@gpseries/domain';

import { TeamId } from '../../../team/domain';
import { Driver, DriverId, Name } from '../model';

export interface DriverRepository {
  create(driver: Driver): void;
  findByNameAndTeam(name: Name, teamId: TeamId): Promise<Nullable<Driver>>;
  find(id: DriverId): Promise<Nullable<Driver>>;
  findAll(): Promise<Driver[]>;
  findAllByTeam(id: TeamId): Promise<Driver[]>;
}

export const driverRepository = 'driverRepository';
