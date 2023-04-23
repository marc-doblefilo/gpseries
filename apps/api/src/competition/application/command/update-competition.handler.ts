import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Competition,
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository,
  Name,
  Race,
  RaceId
} from '../../domain';
import { UpdateCompetitionCommand } from './update-competition.command';

@CommandHandler(UpdateCompetitionCommand)
export class UpdateCompetitionHandler
  implements ICommandHandler<UpdateCompetitionCommand> {
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {}

  async execute(command: UpdateCompetitionCommand) {
    const id = CompetitionId.fromString(command.competitionId);

    const competition = await this.repository.find(id);
    if (!competition) {
      throw CompetitionNotFound.with(id);
    }

    this.updateRaces(competition, command);

    this.repository.update(competition);
  }

  private updateRaces(
    competition: Competition,
    command: UpdateCompetitionCommand
  ) {
    command.races.map(item => {
      const id = RaceId.generate();
      const name = Name.fromString(item.name);
      const date = item.date;

      const race = new Race(id, name, date);

      competition.addRace(race);
    });
  }
}
