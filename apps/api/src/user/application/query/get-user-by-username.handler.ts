import { UserDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Username, UserRepository, userRepository } from '../../domain';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler implements IQueryHandler<GetUserByUsernameQuery> {
  constructor(@Inject(userRepository) private repository: UserRepository) { }
  
  async execute(query: GetUserByUsernameQuery): Promise<Nullable<UserDTO>> {
    const username = Username.fromString(query.username);
    const user = await this.repository.findOneByUsername(username);

    if (!user) {
      return null;
    }

    return {
      id: user.id.value,
      username: user.username.value,
      password: user.password.value,
      roles: user.roles.map((role) => role.value)
    } as UserDTO;
  }
}