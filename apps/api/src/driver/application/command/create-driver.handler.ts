/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DriverAlreadyRegisteredError } from '../../../competition/domain/exception/driver-already-registered.error';
import {
  TeamFinder,
  TeamId,
  TeamRepository,
  teamRepository
} from '../../../team/domain';
import { TeamNotFound } from '../../../team/domain/exception/team-not-found.error';
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
  private readonly teamFinder: TeamFinder;

  constructor(
    @Inject(driverRepository) private repository: DriverRepository,
    @Inject(teamRepository)
    private teamRepository: TeamRepository
  ) {
    this.teamFinder = new TeamFinder(teamRepository);
  }

  async execute(command: CreateDriverCommand) {
    const name = Name.fromString(command.name);

    const teamId = TeamId.fromString(command.teamId);
    await this.teamFinder.findOrThrow(teamId);

    const existsDriver = await this.repository.findByNameAndTeam(name, teamId);

    if (existsDriver) {
      throw DriverAlreadyRegisteredError.with(name, teamId);
    }

    const id = DriverId.generate();

    const driver = Driver.add(id, name, teamId);

    this.repository.create(driver);

    return driver;
  }
}
