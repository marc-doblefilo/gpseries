import { faker } from '@faker-js/faker';

import { Role as RoleEnum } from '../../../../src/auth/security/role.enum';
import {
  Name,
  Password,
  Role,
  User,
  UserId,
  Username
} from '../../../../src/user/domain';

export class UserBuilder {
  private id: UserId = UserId.generate();
  private username: Username = Username.fromString('marc-doblefilo');
  private name: Name = Name.fromString('Marc Rodríguez');
  private password: Password = Password.fromString(faker.internet.password());
  private roles: Role[] = [Role.fromString(RoleEnum.User)];

  public static aUser(): UserBuilder {
    return new UserBuilder();
  }

  public build(): User {
    const user: User = Reflect.construct(User, []);
    Reflect.set(user, '_userId', this.id);
    Reflect.set(user, '_username', this.username);
    Reflect.set(user, '_name', this.name);
    Reflect.set(user, '_password', this.password);
    Reflect.set(user, '_roles', this.roles);

    return user;
  }
}
