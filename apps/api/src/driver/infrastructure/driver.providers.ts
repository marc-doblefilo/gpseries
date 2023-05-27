import { Provider } from '@nestjs/common';

import { teamRepository } from '../../team/domain';
import { TeamMongoRepository } from '../../team/infrastructure/repository/team.repository';
import { driverRepository } from '../domain';
import { DriverMongoRepository } from './repository/driver.repository';

export const driverProviders: Provider[] = [
  {
    provide: driverRepository,
    useClass: DriverMongoRepository
  },
  {
    provide: teamRepository,
    useClass: TeamMongoRepository
  }
];
