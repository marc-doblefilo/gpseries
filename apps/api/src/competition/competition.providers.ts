import { Provider } from '@nestjs/common';

import { competitionRepository } from './domain';
import { CompetitionMongoRepository } from './infrastructure/repository/competition.repository';

export const competitionProviders: Provider[] = [
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  }
];
