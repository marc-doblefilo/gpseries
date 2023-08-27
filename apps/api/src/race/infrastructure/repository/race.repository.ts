import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { CompetitionId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { Name, Race, RaceId, RaceRepository } from '../../domain';
import { RaceMapper } from '../mapper/race.mapper';
import { RaceDocument } from './race.document';
import { RaceSchema } from './race.schema';

@Injectable()
export class RaceMongoRepository implements RaceRepository {
  private model: Model<RaceDocument>;

  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<RaceDocument>('races', RaceSchema);
  }

  async create(race: Race): Promise<void> {
    const document = RaceMapper.aggregateToDocument(race);

    await this.model.create(document);

    race = this.publisher.mergeObjectContext(race);
    race.commit();
  }

  async findByCompetition(competitionId: CompetitionId): Promise<Race[]> {
    const documents = await this.model.find({
      competitionId: competitionId.value
    });

    return documents.map(RaceMapper.documentToAggregate);
  }

  async find(id: RaceId): Promise<Nullable<Race>> {
    const document = await this.model.findById(id.value);

    if (!document) {
      return null;
    }

    return RaceMapper.documentToAggregate(document);
  }

  async findByNameAndCompetition(
    name: Name,
    competitionId: CompetitionId
  ): Promise<Nullable<Race>> {
    const document = await this.model.findOne({
      competitionId: competitionId.value,
      name: name.value
    });

    if (!document) {
      return null;
    }

    return RaceMapper.documentToAggregate(document);
  }

  async delete(race: Race): Promise<void> {
    await this.model.findOneAndUpdate(
      { _id: race.id.value },
      { deleted: new Date() }
    );

    race = this.publisher.mergeObjectContext(race);
    race.commit();
  }
}
