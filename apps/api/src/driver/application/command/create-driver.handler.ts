/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import { DriverAlreadyRegisteredError } from '../../../competition/domain/exception/driver-already-registered.error';
import { UserRepository, userRepository } from '../../../user/domain';
import {
  Driver,
  DriverId,
  DriverRepository,
  driverRepository,
  Name
} from '../../domain';
import { CreateDriverCommand } from './create-driver.command';

@CommandHandler(CreateDriverCommand)
export class CreateDriverHandler
  implements ICommandHandler<CreateDriverCommand> {
  constructor(
    @Inject(driverRepository) private repository: DriverRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {}

  async execute(command: CreateDriverCommand) {
    const name = Name.fromString(command.name);

    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitionRepository.find(competitionId);

    if (!competition) {
      throw CompetitionNotFound.with(competitionId);
    }

    const existsDriver = await this.repository.findByNameAndCompetition(
      name,
      competitionId
    );

    if (existsDriver) {
      throw DriverAlreadyRegisteredError.with(name, competitionId);
    }

    const id = DriverId.generate();

    const driver = Driver.add(id, name, competitionId);

    this.repository.create(driver);

    return driver;
  }
}
