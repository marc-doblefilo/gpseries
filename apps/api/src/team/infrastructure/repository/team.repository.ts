import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { Team, TeamRepository } from '../../domain';
import { TeamMapper } from '../mapper/team.mapper';
import { TeamDocument } from './team.document';
import { TeamSchema } from './team.schema';

@Injectable()
export class TeamMongoRepository implements TeamRepository {
  private model: Model<TeamDocument>;
  constructor(
    @Inject(mongoConnection) connection: Connection,
    private publisher: StoreEventPublisher
  ) {
    this.model = connection.model<TeamDocument>('teams', TeamSchema);
  }

  async find(): Promise<Team[]> {
    const documents = await this.model.find({});

    return documents.map(TeamMapper.documentToAggregate);
  }
}
