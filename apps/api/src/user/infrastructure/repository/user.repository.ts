import { Nullable } from '@gpseries/domain';
import { Inject, Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { User, UserId , Username, UserRepository } from '../../domain';
import { UserMapper } from '../mapper/user.mapper';
import { UserDocument } from './user.document';
import { UserSchema } from './user.schema';

@Injectable()
export class UserMongoRepository implements UserRepository {
  private model: Model<UserDocument>;

  constructor(@Inject(mongoConnection) connection: Connection, private publisher: StoreEventPublisher) {
    this.model = connection.model<UserDocument>('users', UserSchema);
  }

  async find(userId: UserId): Promise<Nullable<User>> {
    const userDocument = await this.model.findOne({ _id: userId.value });

    if (!userDocument) {
      return null;
    }

    return UserMapper.documentToAggregate(userDocument);
  }

  async findOneByUsername(username: Username): Promise<User | null> {
    const userDocument = await this.model.findOne({ username: username.value });

    if (!userDocument) {
      return null;
    }

    return UserMapper.documentToAggregate(userDocument);
  }

  async findAll(): Promise<User[]> {
    const userDocuments = await this.model.find({});

    return userDocuments.map(UserMapper.documentToAggregate);
  }

  async save(user: User): Promise<void> {
    const userDocument = UserMapper.aggregateToDocument(user);
    await this.model.create(userDocument);

    user = this.publisher.mergeObjectContext(user);
    user.commit();
  }

  async remove(userId: UserId): Promise<void> {
    this.model.deleteOne({ _id: userId.value });
  }
}