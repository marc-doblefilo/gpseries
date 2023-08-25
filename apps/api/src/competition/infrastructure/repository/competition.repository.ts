import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import {
  Competition,
  CompetitionId,
  CompetitionRepository,
  Name
} from '../../domain';
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

  async create(competition: Competition): Promise<void> {
    const document = CompetitionMapper.aggregateToDocument(competition);

    await this.model.create(document);

    competition = this.publisher.mergeObjectContext(competition);
    competition.commit();
  }

  async findAll(): Promise<Competition[]> {
    const documents = await this.model.find({});

    return documents.map(CompetitionMapper.documentToAggregate);
  }

  async find(id: CompetitionId): Promise<Nullable<Competition>> {
    const document = await this.model.findById(id.value);

    if (!document) {
      return null;
    }

    return CompetitionMapper.documentToAggregate(document);
  }

  async update(competition: Competition): Promise<void> {
    const document = CompetitionMapper.aggregateToDocument(competition);

    await this.model.findByIdAndUpdate(competition.id.value, document);

    competition = this.publisher.mergeObjectContext(competition);
    competition.commit();
  }

  async findByName(name: Name): Promise<Nullable<Competition>> {
    const document = await this.model.findOne({ name: name.value });

    if (!document) {
      return null;
    }

    return CompetitionMapper.documentToAggregate(document);
  }
}
