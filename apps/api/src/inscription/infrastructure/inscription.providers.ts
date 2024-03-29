import { Provider } from '@nestjs/common';

import { competitionRepository } from '../../competition/domain';
import { CompetitionMongoRepository } from '../../competition/infrastructure/repository/competition.repository';
import { driverRepository } from '../../driver/domain';
import { DriverMongoRepository } from '../../driver/infrastructure/repository/driver.repository';
import { notificationRepository } from '../../notification/domain/repository/notification.repository';
import { NotificationMongoRepository } from '../../notification/infrastructure/repository/notification.repository';
import { raceRepository } from '../../race/domain';
import { RaceMongoRepository } from '../../race/infrastructure/repository/race.repository';
import { inscriptionRepository } from '../domain';
import { InscriptionMongoRepository } from './repository';

export const inscriptionProviders: Provider[] = [
  {
    provide: inscriptionRepository,
    useClass: InscriptionMongoRepository
  },
  {
    provide: driverRepository,
    useClass: DriverMongoRepository
  },
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  },
  {
    provide: raceRepository,
    useClass: RaceMongoRepository
  },
  {
    provide: notificationRepository,
    useClass: NotificationMongoRepository
  }
];
