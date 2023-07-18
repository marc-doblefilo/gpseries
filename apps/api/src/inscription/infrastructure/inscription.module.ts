import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateInscriptionHandler } from '../application/command/create-inscription.handler';
import { GetInscriptionHandler } from '../application/query/get-inscription.handler';
import { InscriptionController } from './controller';
import { inscriptionProviders } from './inscription.providers';

const CommandHandlers = [CreateInscriptionHandler];
const QueryHandlers = [GetInscriptionHandler];

@Module({
  controllers: [InscriptionController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [...inscriptionProviders, ...CommandHandlers, ...QueryHandlers]
})
export class InscriptionModule {}
