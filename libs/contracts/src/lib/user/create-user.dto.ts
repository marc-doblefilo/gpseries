import { Role } from '../auth';

export class CreateUserDTO {
  username: string;
  name: string;
  plainPassword: string;
}
