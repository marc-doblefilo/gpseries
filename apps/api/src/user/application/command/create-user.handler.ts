import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Role as RoleEnum } from '../../../auth/security/role.enum';
import {
  Password,
  Role,
  User,
  UserId,
  Username,
  UserRepository,
  userRepository
} from '../../domain';
import {
  UserIdAlreadyTakenError,
  UsernameAlreadyTakenError
} from '../../domain/exception/';
import { Name } from '../../domain/model/name';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.generate();
    const username = Username.fromString(command.username);
    const password = Password.fromString(command.password);
    const name = Name.fromString(command.name);

    if (await this.repository.find(userId)) {
      throw UserIdAlreadyTakenError.with(userId);
    }

    if (await this.repository.findOneByUsername(username)) {
      throw UsernameAlreadyTakenError.with(username);
    }

    const user = User.add(userId, username, name, password);
    user.addRole(Role.fromString(RoleEnum.User));

    this.repository.save(user);

    return user;
  }
}
