import { User } from '../model/user';
import { UserId } from '../model/user-id';
import { Username } from '../model/username';

export interface UserRepository {
  find(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  findOneByUsername(username: Username): Promise<User | null>;
  save(user: User): void;
}

export const userRepository = 'userRepository';
