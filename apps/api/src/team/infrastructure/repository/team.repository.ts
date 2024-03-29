import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { CompetitionId } from '../../../competition/domain';
import { mongoConnection } from '../../../database/database.provider';
import { UserId } from '../../../user/domain';
import { Team, TeamId, TeamRepository } from '../../domain';
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

  async create(team: Team): Promise<void> {
    const document = TeamMapper.aggregateToDocument(team);

    await this.model.create(document);

    team = this.publisher.mergeObjectContext(team);
    team.commit();
  }

  async find(id: TeamId): Promise<Nullable<Team>> {
    const document = await this.model.findById(id.value);

    if (!document) {
      return null;
    }

    return TeamMapper.documentToAggregate(document);
  }

  async findAll(): Promise<Team[]> {
    const documents = await this.model.find({});

    return documents.map(TeamMapper.documentToAggregate);
  }

  async findByCompetition(id: CompetitionId): Promise<Team[]> {
    const documents = await this.model.find({ competitionId: id.value });

    return documents.map(TeamMapper.documentToAggregate);
  }

  async findByOwner(id: UserId): Promise<Team[]> {
    const documents = await this.model.find({ ownerId: id.value });

    return documents.map(TeamMapper.documentToAggregate);
  }
}
