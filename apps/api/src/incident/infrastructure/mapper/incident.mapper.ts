import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import { Incident, IncidentDescription, IncidentId } from '../../domain';
import { IncidentDocument } from '../repository/incident.document';

export class IncidentMapper {
  public static documentToAggregate(document: IncidentDocument): Incident {
    const { _id, description, driversId, raceId } = document;

    const incident: Incident = Reflect.construct(Incident, []);
    Reflect.set(incident, '_id', IncidentId.fromString(_id));
    Reflect.set(incident, '_raceId', RaceId.fromString(raceId));
    Reflect.set(
      incident,
      '_description',
      IncidentDescription.fromString(description)
    );
    Reflect.set(incident, '_driversId', driversId.map(DriverId.fromString));

    return incident;
  }

  public static aggregateToDocument(incident: Incident) {
    return {
      _id: incident.id.value,
      raceId: incident.raceId.value,
      description: incident.description.value,
      driversId: incident.driversId.map(driver => driver.value)
    };
  }
}
