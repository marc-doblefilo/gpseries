import { UserDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserFinder, UserId } from '../../domain';
import {
  UserRepository,
  userRepository
} from '../../domain/repository/user.repository';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  private readonly userFinder: UserFinder;

  constructor(@Inject(userRepository) repository: UserRepository) {
    this.userFinder = new UserFinder(repository);
  }

  async execute(query: GetUserQuery): Promise<Nullable<UserDTO>> {
    const id = UserId.fromString(query.id);
    const user = await this.userFinder.findOrThrow(id);

    return {
      id: user.id.value,
      username: user.username.value,
      name: user.name.value,
      password: user.password.value,
      roles: user.roles.map(role => role.value)
    };
  }
}
