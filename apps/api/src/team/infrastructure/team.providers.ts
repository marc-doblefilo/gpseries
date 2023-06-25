import { Provider } from '@nestjs/common';

import { competitionRepository } from '../../competition/domain';
import { CompetitionMongoRepository } from '../../competition/infrastructure/repository/competition.repository';
import { driverRepository } from '../../driver/domain';
import { DriverMongoRepository } from '../../driver/infrastructure/repository/driver.repository';
import { userRepository } from '../../user/domain';
import { UserMongoRepository } from '../../user/infrastructure/repository/user.repository';
import { teamRepository } from '../domain';
import { TeamMongoRepository } from './repository/team.repository';

export const teamProviders: Provider[] = [
  {
    provide: teamRepository,
    useClass: TeamMongoRepository
  },
  {
    provide: userRepository,
    useClass: UserMongoRepository
  },
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  },
  {
    provide: driverRepository,
    useClass: DriverMongoRepository
  }
];
