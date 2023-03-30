import { Provider } from '@nestjs/common';

import { userRepository } from '../domain/repository/user.repository';
import { UserMongoRepository } from './repository/user.repository';

export const userProviders: Provider[] = [
  {
    provide: userRepository,
    useClass: UserMongoRepository,
  },
];
