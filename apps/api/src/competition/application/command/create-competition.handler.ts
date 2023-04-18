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
import { CreateCompetitionCommand } from './create-competition.command';

@CommandHandler(CreateCompetitionCommand)
export class CreateCompetitionHandler
  implements ICommandHandler<CreateCompetitionCommand> {
  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {}

  async execute(command: CreateCompetitionCommand) {
    const competitionId = CompetitionId.generate();
    const ownerId = UserId.fromString(command.ownerId);
    const name = Name.fromString(command.name);
    const description = CompetitionDescription.fromString(command.description);

    const competition = Competition.add(
      competitionId,
      ownerId,
      name,
      description
    );

    this.repository.save(competition);

    return competition;
  }
}
