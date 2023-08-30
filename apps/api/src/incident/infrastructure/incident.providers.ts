import { Provider } from '@nestjs/common';

import { raceRepository } from '../../race/domain';
import { RaceMongoRepository } from '../../race/infrastructure/repository/race.repository';
import { incidentRepository } from '../domain';
import { IncidentMongoRepository } from './repository/incident.repository';

export const incidentProviders: Provider[] = [
  {
    provide: incidentRepository,
    useClass: IncidentMongoRepository
  },
  {
    provide: raceRepository,
    useClass: RaceMongoRepository
  }
];
