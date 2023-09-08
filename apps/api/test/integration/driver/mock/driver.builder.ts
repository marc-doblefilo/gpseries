import { faker } from '@faker-js/faker';

import { Driver, DriverId, Name } from '../../../../src/driver/domain';
import { TeamId } from '../../../../src/team/domain';

export class DriverBuilder {
  private id: DriverId = DriverId.generate();
  private name: Name = Name.fromString(faker.person.fullName());
  private teamId: TeamId = TeamId.generate();

  public static aDriver(): DriverBuilder {
    return new DriverBuilder();
  }

  public withTeam(teamId: TeamId): DriverBuilder {
    this.teamId = teamId;

    return this;
  }

  public build(): Driver {
    const driver: Driver = Reflect.construct(Driver, []);
    Reflect.set(driver, '_id', this.id);
    Reflect.set(driver, '_name', this.name);
    Reflect.set(driver, '_teamId', this.teamId);

    return driver;
  }
}
