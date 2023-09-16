import {
  DeleteRaceCommand,
  DeleteRaceHandler
} from '../../../../src/race/application/command';
import { RaceNotFound } from '../../../../src/race/domain/exception/race-not-found.error';
import { RaceBuilder } from '../mock/race.builder';
import { RaceMockRepository } from '../mock/race-repository.mock';

describe('Delete Race Command Handler', () => {
  it('should delete a race', async () => {
    const repository = new RaceMockRepository();
    const race = RaceBuilder.aRace().build();
    repository.create(race);

    const handler = new DeleteRaceHandler(repository);
    const command = new DeleteRaceCommand(race.id.value);

    await handler.execute(command);

    expect(repository.mockDelete).toHaveBeenCalledWith(
      expect.objectContaining({
        id: race.id
      })
    );
  });

  it('should throw an error if race does not exist', async () => {
    const repository = new RaceMockRepository();
    const race = RaceBuilder.aRace().build();

    const handler = new DeleteRaceHandler(repository);
    const command = new DeleteRaceCommand(race.id.value);

    await expect(handler.execute(command)).rejects.toThrow(
      RaceNotFound.with(race.id)
    );
  });
});
