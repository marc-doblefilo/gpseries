import { Id } from '@gpseries/domain';
import * as uuid from 'uuid';

export class NotificationId extends Id {
  static generate(): NotificationId {
    return new NotificationId(uuid.v4());
  }

  public static fromString(id: string): NotificationId {
    return new NotificationId(id);
  }
}
