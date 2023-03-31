import { UserDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserId } from '../../domain';
import { UserRepository, userRepository } from '../../domain/repository/user.repository';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(userRepository) private users: UserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<Nullable<UserDTO>> {
    const user = await this.users.find(UserId.fromString(query.id));

    if (!user) {
      return null;
    }

    return {
      id: user.id.value,
      username: user.username.value,
      password: user.password.value,
      roles: user.roles.map((role) => role.value)
    };
  }
}
