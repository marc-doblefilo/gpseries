import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import {
  CreateDriverHandler,
  GetDriversByTeamHandler,
  GetDriversHandler
} from '../application';
import { GetDriverHandler } from '../application/query/get-driver.handler';
import { DriverController } from './controller/driver.controller';
import { driverProviders } from './driver.providers';

const CommandHandlers = [CreateDriverHandler];
const QueryHandlers = [
  GetDriversHandler,
  GetDriverHandler,
  GetDriversByTeamHandler
];

@Module({
  controllers: [DriverController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...driverProviders, ...CommandHandlers, ...QueryHandlers]
})
export class DriverModule {}
