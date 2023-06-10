import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { RaceId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { DriverId } from '../../../driver/domain';
import { Inscription, InscriptionRepository } from '../../domain';
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
}
