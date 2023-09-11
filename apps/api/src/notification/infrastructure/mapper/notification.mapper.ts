import { CompetitionId } from '../../../competition/domain';
import { Notification, NotificationId } from '../../domain/model';
import { NotificationDocument } from '../repository/notification.document';

export class NotificationMapper {
  public static documentToAggregate(
    document: NotificationDocument
  ): Notification {
    const { _id, competitionId, message, timestamp } = document;

    const notification: Notification = Reflect.construct(Notification, []);
    Reflect.set(notification, '_id', NotificationId.fromString(_id));
    Reflect.set(
      notification,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(notification, '_message', message);
    Reflect.set(notification, '_timestamp', new Date(timestamp));

    return notification;
  }

  public static aggregateToDocument(notification: Notification) {
    return {
      _id: notification.id.value,
      competitionId: notification.competitionId.value,
      message: notification.message,
      timestamp: notification.timestamp
    };
  }
}
