import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import {
  CreateCompetitionHandler,
  GetCompetitionHandler,
  UpdateCompetitionHandler
} from '../application';
import { GetCompetitionsHandler } from '../application/query/get-competitions.handler';
import { GetNextRaceHandler } from '../application/query/get-next-race.handler';
import { competitionProviders } from './competition.providers';
import { CompetitionController } from './controller/competition.controller';

const CommandHandlers = [CreateCompetitionHandler, UpdateCompetitionHandler];
const QueryHandlers = [
  GetCompetitionsHandler,
  GetCompetitionHandler,
  GetNextRaceHandler
];

@Module({
  controllers: [CompetitionController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...competitionProviders, ...CommandHandlers, ...QueryHandlers]
})
export class CompetitionModule {}
