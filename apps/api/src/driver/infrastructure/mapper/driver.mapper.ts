import { CompetitionId } from '../../../competition/domain';
import { Driver, DriverId, Name, Points } from '../../domain';
import { DriverDocument } from '../repository/driver.document';

export class DriverMapper {
  public static documentToAggregate(document: DriverDocument): Driver {
    const { _id, name, competitionId, points } = document;

    const driver: Driver = Reflect.construct(Driver, []);
    Reflect.set(driver, '_id', DriverId.fromString(_id));
    Reflect.set(driver, '_name', Name.fromString(name));
    Reflect.set(
      driver,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(driver, '_points', Points.fromNumber(points));

    return driver;
  }

  public static aggregateToDocument(driver: Driver) {
    return {
      _id: driver.id.value,
      name: driver.name.value,
      competitionId: driver.competitionId.value,
      points: driver.points.value
    };
  }
}
