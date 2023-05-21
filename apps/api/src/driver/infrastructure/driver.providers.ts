import { Provider } from '@nestjs/common';

import { competitionRepository } from '../../competition/domain';
import { CompetitionMongoRepository } from '../../competition/infrastructure/repository/competition.repository';
import { driverRepository } from '../domain';
import { DriverMongoRepository } from './repository/driver.repository';

export const driverProviders: Provider[] = [
  {
    provide: driverRepository,
    useClass: DriverMongoRepository
  },
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  }
];
