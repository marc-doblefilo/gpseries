import { jest } from '@jest/globals';

import {
  User,
  UserId,
  Username,
  UserRepository
} from '../../../../src/user/domain';

export class UserMockRepository implements UserRepository {
  private readonly users: User[] = [];
  public mockCreate = jest.fn((user: User) => this.users.push(user));

  find(userId: UserId): Promise<User | null> {
    const user = this.users.filter(user => user.id.value === userId.value);

    if (user.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user[0]);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOneByUsername(username: Username): Promise<User | null> {
    const user = this.users.filter(
      user => user.username.value === username.value
    );

    if (user.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user[0]);
  }

  save(user: User): void {
    this.mockCreate(user);
  }
}
