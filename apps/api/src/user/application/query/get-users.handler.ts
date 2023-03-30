import { UserDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository,userRepository } from '../../domain';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(userRepository) private users: UserRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<Nullable<Array<UserDTO>>> {
    const users = await this.users.findAll();

    return users.map((user) => ({
      id: user.id.value,
      username: user.username.value,
      password: user.password.value,
      roles: user.roles.map((role) => role.value)
    }));
  }
}
