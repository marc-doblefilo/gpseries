import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { TeamController } from './controller/team.controller';
import { teamProviders } from './team.providers';

const CommandHandlers = [];
const QueryHandlers = [];

@Module({
  controllers: [TeamController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...teamProviders, ...CommandHandlers, ...QueryHandlers]
})
export class TeamModule {}
