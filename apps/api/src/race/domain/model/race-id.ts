import { Id } from '@gpseries/domain';
import * as uuid from 'uuid';

export class RaceId extends Id {
  static generate(): RaceId {
    return new RaceId(uuid.v4());
  }

  public static fromString(id: string): RaceId {
    return new RaceId(id);
  }
}
