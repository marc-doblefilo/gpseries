import { Id } from '@gpseries/domain';
import * as uuid from 'uuid';

export class IncidentId extends Id {
  static generate(): IncidentId {
    return new IncidentId(uuid.v4());
  }

  public static fromString(id: string): IncidentId {
    return new IncidentId(id);
  }
}
