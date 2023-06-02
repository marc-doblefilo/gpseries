import { UserIdNotFoundError } from '../exception';
import { UserId } from '../model';
import { UserRepository } from '../repository';

export class UserFinder {
  public constructor(private repository: UserRepository) {}

  public async findOrThrow(id: UserId) {
    const user = await this.repository.find(id);

    if (!user) {
      throw UserIdNotFoundError.with(id);
    }

    return user;
  }
}
