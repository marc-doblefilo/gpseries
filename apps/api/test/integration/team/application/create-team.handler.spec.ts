import { faker } from '@faker-js/faker';

import {
  CompetitionId,
  CompetitionNotFound
} from '../../../../src/competition/domain';
import { CreateTeamCommand } from '../../../../src/team/application/command/create-team.command';
import { CreateTeamHandler } from '../../../../src/team/application/command/create-team.handler';
import { UserId, UserIdNotFoundError } from '../../../../src/user/domain';
import { CompetitionBuilder } from '../../competition/mock/competition.builder';
import { CompetitionMockRepository } from '../../competition/mock/competition-repository.mock';
import { UserBuilder } from '../../user/mock/user.builder';
import { UserMockRepository } from '../../user/mock/user-repository.mock';
import { TeamMockRepository } from '../mock/team-repository.mock';

describe('Create Team Command Handler', () => {
  it('should create a team and save it', async () => {
    const repository = new TeamMockRepository();
    const userRepository = new UserMockRepository();
    const competitionRepository = new CompetitionMockRepository();
    const user = UserBuilder.aUser().build();
    const competition = CompetitionBuilder.aCompetition().build();
    userRepository.save(user);
    competitionRepository.create(competition);

    const handler = new CreateTeamHandler(
      repository,
      userRepository,
      competitionRepository
    );
    const command = new CreateTeamCommand(
      faker.word.words(),
      user.id.value,
      competition.id.value
    );

    await handler.execute(command);

    expect(repository.mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerId: user.id,
        competitionId: competition.id
      })
    );
  });

  it('should throw an error if the user does not exist', async () => {
    const repository = new TeamMockRepository();
    const userRepository = new UserMockRepository();
    const competitionRepository = new CompetitionMockRepository();
    const competition = CompetitionBuilder.aCompetition().build();
    competitionRepository.create(competition);

    const handler = new CreateTeamHandler(
      repository,
      userRepository,
      competitionRepository
    );
    const command = new CreateTeamCommand(
      faker.word.words(),
      faker.string.uuid(),
      competition.id.value
    );

    await expect(handler.execute(command)).rejects.toThrow(
      UserIdNotFoundError.with(UserId.fromString(command.ownerId))
    );
  });

  it('should throw an error if the competition does not exist', async () => {
    const repository = new TeamMockRepository();
    const userRepository = new UserMockRepository();
    const competitionRepository = new CompetitionMockRepository();
    const user = UserBuilder.aUser().build();
    userRepository.save(user);

    const handler = new CreateTeamHandler(
      repository,
      userRepository,
      competitionRepository
    );
    const command = new CreateTeamCommand(
      faker.word.words(),
      user.id.value,
      faker.string.uuid()
    );

    await expect(handler.execute(command)).rejects.toThrow(
      CompetitionNotFound.with(CompetitionId.fromString(command.competitionId))
    );
  });
});
