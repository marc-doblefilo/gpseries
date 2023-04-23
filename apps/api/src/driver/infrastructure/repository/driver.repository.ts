import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { CompetitionId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { UserId } from '../../../user/domain';
import { Driver, DriverRepository } from '../../domain';
import { DriverMapper } from '../mapper/driver.mapper';
import { DriverDocument } from './driver.document';
import { DriverSchema } from './driver.schema';

@Injectable()
export class DriverMongoRepository implements DriverRepository {
  private model: Model<DriverDocument>;

  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<DriverDocument>('drivers', DriverSchema);
  }

  async create(driver: Driver): Promise<void> {
    const document = DriverMapper.aggregateToDocument(driver);

    await this.model.create(document);

    driver = this.publisher.mergeObjectContext(driver);
    driver.commit();
  }

  async findByUserAndCompetition(
    userId: UserId,
    competitionId: CompetitionId
  ): Promise<Nullable<Driver>> {
    const document = await this.model.findOne({
      userId: userId.value,
      competitionId: competitionId.value
    });

    if (!document) {
      return null;
    }

    return DriverMapper.documentToAggregate(document);
  }
}
