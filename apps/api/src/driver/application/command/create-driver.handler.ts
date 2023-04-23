import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import { DriverAlreadyRegisteredError } from '../../../competition/domain/exception/driver-already-registered.error';
import {
  UserId,
  UserIdNotFoundError,
  UserRepository,
  userRepository
} from '../../../user/domain';
import {
  Driver,
  DriverId,
  DriverRepository,
  driverRepository
} from '../../domain';
import { CreateDriverCommand } from './create-driver.command';

@CommandHandler(CreateDriverCommand)
export class CreateDriverHandler
  implements ICommandHandler<CreateDriverCommand> {
  constructor(
    @Inject(driverRepository) private repository: DriverRepository,
    @Inject(userRepository) private userRepository: UserRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {}

  async execute(command: CreateDriverCommand) {
    const userId = UserId.fromString(command.userId);
    const user = await this.userRepository.find(
      UserId.fromString(command.userId)
    );

    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitionRepository.find(competitionId);

    if (!competition) {
      throw CompetitionNotFound.with(competitionId);
    }

    const existsDriver = await this.repository.findByUserAndCompetition(
      userId,
      competitionId
    );

    if (existsDriver) {
      throw DriverAlreadyRegisteredError.with(userId, competitionId);
    }

    const id = DriverId.generate();

    const driver = Driver.add(id, userId, competitionId);

    this.repository.create(driver);

    return driver;
  }
}
