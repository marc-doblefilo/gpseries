import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  UserId,
  UserIdNotFoundError,
  UserRepository,
  userRepository
} from '../../../user/domain';
import {
  Name,
  Team,
  TeamId,
  TeamRepository,
  teamRepository
} from '../../domain';
import { CreateTeamCommand } from './create-team.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(
    @Inject(teamRepository) private repository: TeamRepository,
    @Inject(userRepository) private userRepository: UserRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {}

  async execute(command: CreateTeamCommand): Promise<Team> {
    const ownerId = UserId.fromString(command.ownerId);
    const user = await this.userRepository.find(ownerId);
    if (!user) {
      throw UserIdNotFoundError.with(ownerId);
    }

    const competitionId = CompetitionId.fromString(command.competitionId);
    const competition = await this.competitionRepository.find(competitionId);
    if (!competition) {
      throw CompetitionNotFound.with(competitionId);
    }

    const teamId = TeamId.generate();
    const name = Name.fromString(command.name);

    const team = Team.add(teamId, ownerId, competitionId, name);

    this.repository.create(team);

    return team;
  }
}
