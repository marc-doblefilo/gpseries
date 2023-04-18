import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../database/database.module';
import { CreateCompetitionHandler } from './application';
import { GetCompetitionsHandler } from './application/query/get-competitions.handler';
import { competitionProviders } from './competition.providers';
import { CompetitionController } from './infrastructure/controller/competition.controller';

const CommandHandlers = [CreateCompetitionHandler];
const QueryHandlers = [GetCompetitionsHandler];

@Module({
  controllers: [CompetitionController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...competitionProviders, ...CommandHandlers, ...QueryHandlers]
})
export class CompetitionModule {}
