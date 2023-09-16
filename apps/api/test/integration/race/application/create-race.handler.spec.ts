import {
  CreateRaceCommand,
  CreateRaceHandler
} from '../../../../src/race/application/command';
import { Name } from '../../../../src/race/domain';
import { RaceAlreadyExists } from '../../../../src/race/domain/exception/race-already-exists.error';
import { CompetitionBuilder } from '../../competition/mock/competition.builder';
import { CompetitionMockRepository } from '../../competition/mock/competition-repository.mock';
import { RaceBuilder } from '../mock/race.builder';
import { RaceMockRepository } from '../mock/race-repository.mock';

describe('Create Race Command Handler', () => {
  it('should create a race and save it', async () => {
    const repository = new RaceMockRepository();
    const competitionRepository = new CompetitionMockRepository();
    const competition = CompetitionBuilder.aCompetition().build();
    competitionRepository.create(competition);

    const handler = new CreateRaceHandler(repository, competitionRepository);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const command = new CreateRaceCommand(
      competition.id.value,
      'GP Bahrain',
      tomorrow
    );

    await handler.execute(command);

    expect(repository.mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        competitionId: competition.id,
        name: Name.fromString('GP Bahrain'),
        date: tomorrow
      })
    );
  });

  it('should throw if race already exists', async () => {
    const repository = new RaceMockRepository();
    const competitionRepository = new CompetitionMockRepository();
    const competition = CompetitionBuilder.aCompetition().build();
    const race = RaceBuilder.aRace().withCompetitionId(competition.id).build();
    competitionRepository.create(competition);
    repository.create(race);

    const handler = new CreateRaceHandler(repository, competitionRepository);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const command = new CreateRaceCommand(
      competition.id.value,
      race.name.value,
      tomorrow
    );

    await expect(handler.execute(command)).rejects.toThrow(
      RaceAlreadyExists.with(race.name)
    );
  });
});
