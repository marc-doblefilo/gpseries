import { CreateCompetitionHandler } from '../../../../src/competition/application';
import { CompetitionAlreadyExists } from '../../../../src/competition/domain/exception/competition-already-exists.error';
import { CompetitionBuilder } from '../mock/competition.builder';
import { CompetitionMockRepository } from '../mock/competition-repository.mock';
import { CreateCompetitionCommandBuilder } from '../mock/create-competition-command.builder';

describe('Create Competition Command Handler', () => {
  it('should create a competition and save it', async () => {
    const repository = new CompetitionMockRepository();
    const competition = CompetitionBuilder.aCompetition().build();
    const handler = new CreateCompetitionHandler(repository);
    const command = CreateCompetitionCommandBuilder.build(competition);

    await handler.execute(command);

    expect(repository.mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerId: competition.ownerId,
        name: competition.name,
        description: competition.description,
        driversPerTeam: competition.driversPerTeam
      })
    );
  });

  it('should throw an error when competition with that name already exists', async () => {
    const competition = CompetitionBuilder.aCompetition().build();
    const repository = new CompetitionMockRepository([competition]);
    const handler = new CreateCompetitionHandler(repository);
    const command = CreateCompetitionCommandBuilder.build(competition);

    await expect(handler.execute(command)).rejects.toThrow(
      CompetitionAlreadyExists.with(competition.name)
    );
  });
});
