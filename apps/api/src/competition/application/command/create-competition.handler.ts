import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import {
  Competition,
  CompetitionDescription,
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository,
  Name
} from '../../domain';
import { CompetitionAlreadyExists } from '../../domain/exception/competition-already-exists.error';
import { DriversPerTeam } from '../../domain/model/drivers-per-team';
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionHandler
  implements ICommandHandler<CreateCompetitionCommand>
{
  private readonly finder: CompetitionFinder;

  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {
    this.finder = new CompetitionFinder(repository);
  }

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.generate();
    const ownerId = UserId.fromString(command.ownerId);
    const name = Name.fromString(command.name);
    let description: Nullable<CompetitionDescription> = null;
    const driversPerTeam = DriversPerTeam.fromPrimitive(command.driversPerTeam);

    if (command.description.length !== 0) {
      description = CompetitionDescription.fromString(command.description);
    }

    const competitionExists = await this.repository.findByName(name);

    if (competitionExists) {
      throw CompetitionAlreadyExists.with(name);
    }

    const competition = Competition.add(
      competitionId,
      ownerId,
      name,
      description,
      driversPerTeam
    );

    this.repository.create(competition);

    return competition;
  }
}
