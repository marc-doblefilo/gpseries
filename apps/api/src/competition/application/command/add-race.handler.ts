import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Competition,
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository,
  Name,
  Race,
  RaceId
} from '../../domain';
import { AddRaceCommand } from './add-race.command';
import { UpdateCompetitionCommand } from './update-competition.command';

@CommandHandler(AddRaceCommand)
export class AddRaceHandler implements ICommandHandler<AddRaceCommand> {
  private readonly competitionFinder: CompetitionFinder;

  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(repository);
  }

  async execute(command: AddRaceCommand) {
    const id = CompetitionId.fromString(command.competitionId);

    const competition = await this.competitionFinder.findOrThrow(id);

    const raceId = RaceId.generate();
    const name = Name.fromString(command.name);
    const date = command.date;

    const race = new Race(raceId, name, date);

    competition.addRace(race);

    this.repository.update(competition);
  }
}
