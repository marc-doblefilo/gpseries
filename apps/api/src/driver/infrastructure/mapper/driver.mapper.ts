import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { Driver, DriverId, Points } from '../../domain';
import { DriverDocument } from '../repository/driver.document';

export class DriverMapper {
  public static documentToAggregate(document: DriverDocument): Driver {
    const { _id, userId, competitionId, points } = document;

    const driver: Driver = Reflect.construct(Driver, []);
    Reflect.set(driver, '_id', DriverId.fromString(_id));
    Reflect.set(driver, '_userId', UserId.fromString(userId));
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
      userId: driver.userId.value,
      competitionId: driver.competitionId.value,
      points: driver.points.value
    };
  }
}
