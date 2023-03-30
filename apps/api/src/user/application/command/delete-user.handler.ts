import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId, UserIdNotFoundError, UserRepository,userRepository } from '../../domain';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(userRepository) private repository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.repository.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    user.delete();

    this.repository.save(user);
  }
}
