import { CompetitionId } from '../../../competition/domain';
import { Notification } from '../model';

export interface NotificationRepository {
  create(notification: Notification): void;
  findByCompetition(id: CompetitionId): Promise<Notification[]>;
}

export const notificationRepository = 'notificationRepository';
