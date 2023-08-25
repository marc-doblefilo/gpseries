import { Provider } from '@nestjs/common';

import { competitionRepository } from '../../competition/domain';
import { CompetitionMongoRepository } from '../../competition/infrastructure/repository/competition.repository';
import { raceRepository } from '../domain';
import { RaceMongoRepository } from './repository/race.repository';

export const raceProviders: Provider[] = [
  {
    provide: raceRepository,
    useClass: RaceMongoRepository
  },
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  }
];
