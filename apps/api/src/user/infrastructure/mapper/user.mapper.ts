import { UserDTO } from '@gpseries/contracts';

import { Password, Role, User, UserId, Username } from '../../domain';
import { UserDocument } from '../repository/user.document';

export class UserMapper {
  static documentToDTO(document: UserDocument): UserDTO {
    const { _id, username, password, roles } = document;
    return {
      id: _id,
      username,
      password,
      roles,
    };
  }

  public static documentToAggregate(document: UserDocument) {
    const { _id, username, password, roles } = document;

    const user: User = Reflect.construct(User, []);
    Reflect.set(user, '_userId', UserId.fromString(_id));
    Reflect.set(user, '_username', Username.fromString(username));
    Reflect.set(user, '_password', Password.fromString(password));
    Reflect.set(
      user,
      '_roles',
      roles.map((role: string) => Role.fromString(role))
    );

    return user;
  }

  public static aggregateToDocument(user: User) {
    return {
      _id: user.id.value,
      username: user.username.value,
      password: user.password.value,
      roles: user.roles.map((role) => role.value),
    } as UserDocument;
  }
}