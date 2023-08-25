import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateRaceHandler } from '../application/command/create-race.handler';
import { GetNextRaceHandler } from '../application/query/get-next-race.handler';
import { RaceController } from './controller';
import { raceProviders } from './race.providers';

const CommandHandlers = [CreateRaceHandler];
const QueryHandlers = [GetNextRaceHandler];

@Module({
  controllers: [RaceController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...raceProviders, ...CommandHandlers, ...QueryHandlers]
})
export class RaceModule {}
