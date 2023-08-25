import { Provider } from '@nestjs/common';

import { raceRepository } from '../../race/domain';
import { RaceMongoRepository } from '../../race/infrastructure/repository/race.repository';
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
  }
];
