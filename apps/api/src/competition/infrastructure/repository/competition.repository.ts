import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { Competition, CompetitionRepository } from '../../domain';
import { CompetitionMapper } from '../mapper/competition.mapper';
import { CompetitionDocument } from './competition.document';
import { CompetitionSchema } from './competition.schema';

@Injectable()
export class CompetitionMongoRepository implements CompetitionRepository {
  private model: Model<CompetitionDocument>;

  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<CompetitionDocument>(
      'competitions',
      CompetitionSchema
    );
  }

  async save(competition: Competition): Promise<void> {
    const competitionDocument = CompetitionMapper.aggregateToDocument(
      competition
    );
    await this.model.create(competitionDocument);

    competition = this.publisher.mergeObjectContext(competition);
    competition.commit();
  }

  async findAll(): Promise<Competition[]> {
    const documents = await this.model.find({});

    return documents.map(CompetitionMapper.documentToAggregate);
  }
}
