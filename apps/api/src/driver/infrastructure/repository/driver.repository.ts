import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { CompetitionId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { TeamId } from '../../../team/domain';
import { Driver, DriverId, DriverRepository, Name } from '../../domain';
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

  async findByNameAndTeam(
    name: Name,
    teamId: TeamId
  ): Promise<Nullable<Driver>> {
    const document = await this.model.findOne({
      name: name.value,
      teamId: teamId.value
    });

    if (!document) {
      return null;
    }

    return DriverMapper.documentToAggregate(document);
  }

  async find(): Promise<Driver[]> {
    const documents = await this.model.find({});

    return documents.map(DriverMapper.documentToAggregate);
  }

  async findOne(id: DriverId): Promise<Nullable<Driver>> {
    const document = await this.model.findById(id.value);

    if (!document) {
      return null;
    }

    return DriverMapper.documentToAggregate(document);
  }

  async findByTeam(id: TeamId): Promise<Driver[]> {
    const documents = await this.model.find({ teamId: id.value });

    return documents.map(DriverMapper.documentToAggregate);
  }
}
