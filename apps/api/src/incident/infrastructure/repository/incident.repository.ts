import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { RaceId } from '../../../race/domain';
import { Incident, IncidentRepository } from '../../domain';
import { IncidentMapper } from '../mapper/incident.mapper';
import { IncidentDocument } from './incident.document';
import { IncidentSchema } from './incident.schema';

@Injectable()
export class IncidentMongoRepository implements IncidentRepository {
  private model: Model<IncidentDocument>;

  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<IncidentDocument>(
      'incidents',
      IncidentSchema
    );
  }

  async create(incident: Incident): Promise<void> {
    const document = IncidentMapper.aggregateToDocument(incident);

    await this.model.create(document);

    incident = this.publisher.mergeObjectContext(incident);
    incident.commit();
  }

  async findByRace(raceId: RaceId): Promise<Incident[]> {
    const documents = await this.model.find({ raceId: raceId.value });

    if (!documents) {
      return [];
    }

    return documents.map(IncidentMapper.documentToAggregate);
  }
}
