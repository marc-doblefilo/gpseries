import { Provider } from '@nestjs/common';

import { driverRepository } from '../../driver/domain';
import { DriverMongoRepository } from '../../driver/infrastructure/repository/driver.repository';
import { inscriptionRepository } from '../../inscription/domain';
import { InscriptionMongoRepository } from '../../inscription/infrastructure';
import { raceRepository } from '../../race/domain';
import { RaceMongoRepository } from '../../race/infrastructure/repository/race.repository';
import { teamRepository } from '../../team/domain';
import { TeamMongoRepository } from '../../team/infrastructure/repository/team.repository';
import { competitionRepository } from '../domain';
import { CompetitionMongoRepository } from './repository/competition.repository';

export const competitionProviders: Provider[] = [
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  },
  {
    provide: raceRepository,
    useClass: RaceMongoRepository
  },
  {
    provide: driverRepository,
    useClass: DriverMongoRepository
  },
  {
    provide: teamRepository,
    useClass: TeamMongoRepository
  },
  {
    provide: inscriptionRepository,
    useClass: InscriptionMongoRepository
  }
];
