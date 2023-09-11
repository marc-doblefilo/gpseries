import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { GetNotificationsByUserHandler } from '../application/query/get-notifications-by-user.handler';
import { GetNotificationsByUser } from '../application/query/get-notifications-by-user.query';
import { NotificationController } from './controller/notification.controller';
import { notificationProviders } from './notification.providers';

const CommandHandlers = [];
const QueryHandlers = [GetNotificationsByUserHandler];

@Module({
  controllers: [NotificationController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...notificationProviders, ...CommandHandlers, ...QueryHandlers]
})
export class NotificationModule {}
