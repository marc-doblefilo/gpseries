import { NotificationDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import { TeamRepository, teamRepository } from '../../../team/domain';
import { UserId } from '../../../user/domain';
import {
  NotificationRepository,
  notificationRepository
} from '../../domain/repository/notification.repository';
import { GetNotificationsByUser } from './get-notifications-by-user.query';

@QueryHandler(GetNotificationsByUser)
export class GetNotificationsByUserHandler
  implements IQueryHandler<GetNotificationsByUser>
{
  constructor(
    @Inject(notificationRepository) private repository: NotificationRepository,
    @Inject(teamRepository) private teamRepository: TeamRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {}

  async execute(query: GetNotificationsByUser): Promise<NotificationDTO[]> {
    const userId = UserId.fromString(query.userId);

    const teams = await this.teamRepository.findByOwner(userId);

    const notificationsPromise = teams.map(team =>
      this.repository.findByCompetition(team.competitionId)
    );
    const notifications = (await Promise.all(notificationsPromise)).flat();

    return (
      await Promise.all(
        notifications.map(async notification => {
          const competition = await this.competitionRepository.find(
            notification.competitionId
          );

          if (!competition) {
            throw CompetitionNotFound.with(notification.competitionId);
          }

          return {
            id: notification.id.value,
            competition: competition.name.value,
            message: notification.message,
            timeAgo: notification.timeAgo
          };
        })
      )
    ).flat();
  }
}
