import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  RaceFinder,
  RaceId,
  RaceRepository,
  raceRepository
} from '../../domain';
import { DeleteRaceCommand } from './delete-race.command';

@CommandHandler(DeleteRaceCommand)
export class DeleteRaceHandler implements ICommandHandler<DeleteRaceCommand> {
  private readonly raceFinder: RaceFinder;

  constructor(@Inject(raceRepository) private repository: RaceRepository) {
    this.raceFinder = new RaceFinder(repository);
  }

  async execute(command: DeleteRaceCommand) {
    const raceId = RaceId.fromString(command.id);

    const race = await this.raceFinder.findOrThrow(raceId);

    race.delete();

    this.repository.delete(race);
  }
}
