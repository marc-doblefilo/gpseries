import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { DatabaseModule } from '../database/database.module';
import { competitionProviders } from './competition.providers';
import { CompetitionController } from './infrastructure/controller/competition.controller';

const CommandHandlers = [];
const QueryHandlers = [];

@Module({
  controllers: [CompetitionController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...competitionProviders, ...CommandHandlers, ...QueryHandlers]
})
export class CompetitionModule {}
