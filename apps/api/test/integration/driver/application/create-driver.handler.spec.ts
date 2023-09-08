import { faker } from '@faker-js/faker';

import { DriverAlreadyRegisteredError } from '../../../../src/competition/domain/exception/driver-already-registered.error';
import {
  CreateDriverCommand,
  CreateDriverHandler
} from '../../../../src/driver/application/command';
import { Name } from '../../../../src/driver/domain';
import { TeamId, TeamNotFound } from '../../../../src/team/domain';
import { TeamBuilder } from '../../team/mock/team.builder';
import { TeamMockRepository } from '../../team/mock/team-repository.mock';
import { DriverBuilder } from '../mock/driver.builder';
import { DriverMockRepository } from '../mock/driver-repository.mock';

describe('Create Driver Command Handler', () => {
  it('should create a driver and save it', async () => {
    const repository = new DriverMockRepository();
    const teamRepository = new TeamMockRepository();
    const team = TeamBuilder.aTeam().build();
    teamRepository.create(team);
    const handler = new CreateDriverHandler(repository, teamRepository);
    const command = new CreateDriverCommand(
      faker.person.fullName(),
      team.id.value
    );

    await handler.execute(command);

    expect(repository.mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: Name.fromString(command.name),
        teamId: team.id
      })
    );
  });

  it('should throw an error when driver already exists with that name in that team', async () => {
    const teamRepository = new TeamMockRepository();
    const team = TeamBuilder.aTeam().build();
    const driver = DriverBuilder.aDriver().withTeam(team.id).build();
    const repository = new DriverMockRepository([driver]);
    teamRepository.create(team);
    repository.create(driver);
    const handler = new CreateDriverHandler(repository, teamRepository);
    const command = new CreateDriverCommand(driver.name.value, team.id.value);

    await expect(handler.execute(command)).rejects.toThrow(
      DriverAlreadyRegisteredError.with(driver.name, team.id)
    );
  });

  it('should throw an error when team does not exist', async () => {
    const teamRepository = new TeamMockRepository();
    const repository = new DriverMockRepository();
    const handler = new CreateDriverHandler(repository, teamRepository);
    const teamId = TeamId.generate();
    const command = new CreateDriverCommand(
      faker.person.fullName(),
      teamId.value
    );

    await expect(handler.execute(command)).rejects.toThrow(
      TeamNotFound.with(teamId)
    );
  });
});
