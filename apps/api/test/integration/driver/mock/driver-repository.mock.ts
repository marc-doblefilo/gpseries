import { Nullable } from '@gpseries/domain';
import { jest } from '@jest/globals';

import {
  Driver,
  DriverId,
  DriverRepository,
  Name
} from '../../../../src/driver/domain';
import { TeamId } from '../../../../src/team/domain';

export class DriverMockRepository implements DriverRepository {
  private readonly drivers: Driver[] = [];
  public mockCreate = jest.fn((driver: Driver) => this.drivers.push(driver));

  constructor(drivers?: Driver[]) {
    this.drivers = drivers || [];
  }

  create(driver: Driver): void {
    this.mockCreate(driver);
  }

  find(): Promise<Driver[]> {
    return Promise.resolve(this.drivers);
  }

  findOne(id: DriverId): Promise<Nullable<Driver>> {
    const driver = this.drivers.filter(driver => driver.id.value === id.value);

    if (driver.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(driver[0]);
  }

  findByTeam(id: TeamId): Promise<Driver[]> {
    const drivers = this.drivers.filter(
      driver => driver.teamId.value === id.value
    );

    return Promise.resolve(drivers);
  }

  findByNameAndTeam(name: Name, teamId: TeamId): Promise<Nullable<Driver>> {
    const driver = this.drivers.filter(
      driver =>
        driver.teamId.value === teamId.value && driver.name.value === name.value
    );

    if (driver.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(driver[0]);
  }
}
