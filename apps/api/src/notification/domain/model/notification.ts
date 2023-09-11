import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { NotificationId } from './notification-id';

export class Notification extends AggregateRoot {
  private _id: NotificationId;
  private _competitionId: CompetitionId;
  private _message: string;
  private _timestamp: Date;

  constructor() {
    super();
  }

  public static add(
    id: NotificationId,
    competitionId: CompetitionId,
    message: string,
    timestamp: Date
  ) {
    const notification = new Notification();

    notification._id = id;
    notification._competitionId = competitionId;
    notification._message = message;
    notification._timestamp = timestamp;

    return notification;
  }

  get id(): NotificationId {
    return this._id;
  }

  get message(): string {
    return this._message;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get timeAgo(): string {
    const now = new Date();
    const diff = now.getTime() - this._timestamp.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);

    console.info(this._timestamp);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    }
  }
}
