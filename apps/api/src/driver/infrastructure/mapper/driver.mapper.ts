import { TeamId } from '../../../team/domain';
import { Driver, DriverId, Name } from '../../domain';
import { DriverDocument } from '../repository/driver.document';

export class DriverMapper {
  public static documentToAggregate(document: DriverDocument): Driver {
    const { _id, name, teamId } = document;

    const driver: Driver = Reflect.construct(Driver, []);
    Reflect.set(driver, '_id', DriverId.fromString(_id));
    Reflect.set(driver, '_name', Name.fromString(name));
    Reflect.set(driver, '_teamId', TeamId.fromString(teamId));

    return driver;
  }

  public static aggregateToDocument(driver: Driver) {
    return {
      _id: driver.id.value,
      name: driver.name.value,
      teamId: driver.teamId.value
    };
  }
}
