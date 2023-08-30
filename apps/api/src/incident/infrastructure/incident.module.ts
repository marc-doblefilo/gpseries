import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateIncidentHandler } from '../application/command/create-incident.handler';
import { GetIncidentsByCompetitionHandler } from '../application/query/get-incidents-by-competition.handler';
import { IncidentController } from './controller/incident.controller';
import { incidentProviders } from './incident.providers';

const CommandHandlers = [CreateIncidentHandler];
const QueryHandlers = [GetIncidentsByCompetitionHandler];

@Module({
  controllers: [IncidentController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...incidentProviders, ...CommandHandlers, ...QueryHandlers]
})
export class IncidentModule {}
