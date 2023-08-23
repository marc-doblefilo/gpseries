import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import {
  Competition,
  CompetitionDescription,
  CompetitionId,
  CompetitionRepository,
  competitionRepository,
  Name
} from '../../domain';
import { DriversPerTeam } from '../../domain/model/drivers-per-team';
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionHandler
  implements ICommandHandler<CreateCompetitionCommand>
{
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {}

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.generate();
    const ownerId = UserId.fromString(command.ownerId);
    const name = Name.fromString(command.name);
    const description: Nullable<CompetitionDescription> = null;
    const driversPerTeam = DriversPerTeam.fromPrimitive(command.driversPerTeam);

    if (command.description.length !== 0) {
      description;
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
