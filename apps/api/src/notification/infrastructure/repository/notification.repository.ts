import { Inject, Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { CompetitionId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { Notification } from '../../domain/model';
import { NotificationRepository } from '../../domain/repository/notification.repository';
import { NotificationMapper } from '../mapper/notification.mapper';
import { NotificationDocument } from './notification.document';
import { NotificationSchema } from './notification.schema';

@Injectable()
export class NotificationMongoRepository implements NotificationRepository {
  private model: Model<NotificationDocument>;

  constructor(@Inject(mongoConnection) connection: Connection) {
    this.model = connection.model<NotificationDocument>(
      'notifications',
      NotificationSchema
    );
  }

  async create(notification: Notification): Promise<void> {
    const document = NotificationMapper.aggregateToDocument(notification);

    console.info(document);

    await this.model.create(document);
  }

  findByCompetition(id: CompetitionId): Promise<Notification[]> {
    return this.model
      .find({ competitionId: id.value })
      .sort({ timestamp: -1 })
      .exec()
      .then(docs =>
        docs.map(doc => {
          return NotificationMapper.documentToAggregate(doc);
        })
      );
  }
}
