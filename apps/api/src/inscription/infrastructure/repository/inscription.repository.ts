import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import {
  Inscription,
  InscriptionId,
  InscriptionRepository
} from '../../domain';
import { InscriptionMapper } from '../mapper';
import { InscriptionDocument } from './inscription.document';
import { InscriptionSchema } from './inscription.schema';

@Injectable()
export class InscriptionMongoRepository implements InscriptionRepository {
  private model: Model<InscriptionDocument>;

  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<InscriptionDocument>(
      'inscriptions',
      InscriptionSchema
    );
  }

  async create(inscription: Inscription): Promise<void> {
    const document = InscriptionMapper.aggregateToDocument(inscription);

    await this.model.create(document);

    inscription = this.publisher.mergeObjectContext(inscription);
    inscription.commit();
  }

  async update(inscription: Inscription): Promise<void> {
    const document = InscriptionMapper.aggregateToDocument(inscription);

    await this.model.findOneAndUpdate({ _id: inscription.id.value }, document);

    inscription = this.publisher.mergeObjectContext(inscription);
    inscription.commit();
  }

  async findByDriverAndRace(
    driverId: DriverId,
    raceId: RaceId
  ): Promise<Nullable<Inscription>> {
    const document = await this.model.findOne({
      driverId: driverId.value,
      raceId: raceId.value
    });

    if (!document) {
      return null;
    }

    return InscriptionMapper.documentToAggregate(document);
  }

  async findByRace(raceId: RaceId): Promise<Inscription[]> {
    const documents = await this.model.find({
      raceId: raceId.value
    });

    if (!documents) {
      return [];
    }

    return documents.map(document =>
      InscriptionMapper.documentToAggregate(document)
    );
  }

  async find(id: InscriptionId): Promise<Nullable<Inscription>> {
    const document = await this.model.findById(id.value);

    if (!document) {
      return null;
    }

    return InscriptionMapper.documentToAggregate(document);
  }
}
