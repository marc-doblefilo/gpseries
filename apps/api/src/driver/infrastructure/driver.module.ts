import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateDriverHandler, GetDriversHandler } from '../application';
import { DriverController } from './controller/driver.controller';
import { driverProviders } from './driver.providers';

const CommandHandlers = [CreateDriverHandler];
const QueryHandlers = [GetDriversHandler];

@Module({
  controllers: [DriverController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...driverProviders, ...CommandHandlers, ...QueryHandlers]
})
export class DriverModule {}
