import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { RolesGuard } from './auth/security/roles.guard';

@Module({
  imports: [EventSourcingModule.forRoot({
    mongoURL: process.env.MONGO_EVENT_STORE_URI || 'mongo://localhost:27017/eventstore'
  })],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BootstrapModule {}
