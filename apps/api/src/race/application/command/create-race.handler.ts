import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  Name,
  Race,
  RaceId,
  RaceRepository,
  raceRepository
} from '../../domain';
import { RaceAlreadyExists } from '../../domain/exception/race-already-exists.error';
import { CreateRaceCommand } from './create-race.command';

@CommandHandler(CreateRaceCommand)
export class CreateRaceHandler implements ICommandHandler<CreateRaceCommand> {
  private readonly competitionFinder: CompetitionFinder;

  constructor(
    @Inject(raceRepository) private repository: RaceRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(competitionRepository);
  }

  async execute(command: CreateRaceCommand) {
    const competitionId = CompetitionId.fromString(command.competitionId);

    await this.competitionFinder.findOrThrow(competitionId);

    const name = Name.fromString(command.name);

    const existRace = await this.repository.findByNameAndCompetition(
      name,
      competitionId
    );

    if (existRace) {
      throw RaceAlreadyExists.with(name);
    }

    const id = RaceId.generate();
    const date = command.date;

    const race = Race.add(id, competitionId, name, date);

    this.repository.create(race);
  }
}
