import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  DriverFinder,
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import {
  Notification,
  NotificationId
} from '../../../notification/domain/model';
import {
  NotificationRepository,
  notificationRepository
} from '../../../notification/domain/repository/notification.repository';
import { Race, RaceRepository, raceRepository } from '../../../race/domain';
import {
  Inscription,
  InscriptionId,
  InscriptionRepository,
  inscriptionRepository,
  Position
} from '../../domain';
import { AddResultsCommand } from './add-results.command';

@CommandHandler(AddResultsCommand)
export class AddResultsHandler implements ICommandHandler<AddResultsCommand> {
  private readonly driverFinder: DriverFinder;
  constructor(
    @Inject(inscriptionRepository) private repository: InscriptionRepository,
    @Inject(driverRepository) private driverRepository: DriverRepository,
    @Inject(raceRepository)
    private raceRepository: RaceRepository,
    @Inject(notificationRepository)
    private notificationRepository: NotificationRepository
  ) {
    this.driverFinder = new DriverFinder(driverRepository);
  }

  async execute(command: AddResultsCommand): Promise<void> {
    command.request.map(async result => {
      const id = InscriptionId.fromString(result.inscriptionId);
      const position = Position.fromPrimitive(result.position);

      const inscription = await this.repository.find(id);

      if (!inscription) {
        return null;
      }

      const race = await this.raceRepository.find(inscription.raceId);

      if (!race) {
        return null;
      }

      inscription.addResult(position);

      this.repository.update(inscription);
    });
    this.sendNotification(command.request[0]);
  }

  private async sendNotification(result) {
    const id = InscriptionId.fromString(result.inscriptionId);

    const inscription = await this.repository.find(id);

    if (!inscription) {
      return null;
    }

    const race = await this.raceRepository.find(inscription.raceId);

    if (!race) {
      return null;
    }

    const notification = Notification.add(
      NotificationId.generate(),
      race.competitionId,
      `The result for the ${race.name.value} was added or edited`,
      new Date()
    );
    this.notificationRepository.create(notification);
  }
}
