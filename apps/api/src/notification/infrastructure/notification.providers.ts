import { Provider } from '@nestjs/common';

import { competitionRepository } from '../../competition/domain';
import { CompetitionMongoRepository } from '../../competition/infrastructure/repository/competition.repository';
import { teamRepository } from '../../team/domain';
import { TeamMongoRepository } from '../../team/infrastructure/repository/team.repository';
import { notificationRepository } from '../domain/repository/notification.repository';
import { NotificationMongoRepository } from './repository/notification.repository';

export const notificationProviders: Provider[] = [
  {
    provide: notificationRepository,
    useClass: NotificationMongoRepository
  },
  {
    provide: teamRepository,
    useClass: TeamMongoRepository
  },
  {
    provide: competitionRepository,
    useClass: CompetitionMongoRepository
  }
];
