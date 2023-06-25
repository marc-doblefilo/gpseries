import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateTeamHandler } from '../application/command/create-team.handler';
import { GetTeamHandler } from '../application/query/get-team.handler';
import { GetTeamsHandler } from '../application/query/get-teams.handler';
import { GetTeamsByCompetitionHandler } from '../application/query/get-teams-by-competition.handler';
import { TeamController } from './controller/team.controller';
import { teamProviders } from './team.providers';

const CommandHandlers = [CreateTeamHandler];
const QueryHandlers = [
  GetTeamHandler,
  GetTeamsHandler,
  GetTeamsByCompetitionHandler
];

@Module({
  controllers: [TeamController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...teamProviders, ...CommandHandlers, ...QueryHandlers]
})
export class TeamModule {}
