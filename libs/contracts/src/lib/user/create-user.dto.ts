import { Role } from '../auth';

export class CreateUserDTO {
  username: string;
  plainPassword: string;
  roles: Role[];
}
