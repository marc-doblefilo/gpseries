import { Role } from '../auth';

export class EditUserDTO {
  username: string;
  name: string;
  plainPassword: string;
  roles: Role[];
}
