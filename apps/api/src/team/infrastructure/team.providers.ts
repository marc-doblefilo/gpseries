import { Provider } from '@nestjs/common';

import { teamRepository } from '../domain';
import { TeamMongoRepository } from './repository/team.repository';

export const teamProviders: Provider[] = [
  {
    provide: teamRepository,
    useClass: TeamMongoRepository
  }
];
