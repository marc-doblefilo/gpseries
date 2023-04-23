import { Provider } from '@nestjs/common';

import { competitionRepository } from '../domain';
import { CompetitionMongoRepository } from './repository/competition.repository';

export const competitionProviders: Provider[] = [
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  }
];
