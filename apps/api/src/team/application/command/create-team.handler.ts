import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionFinder,
  CompetitionId,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  UserFinder,
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
  private readonly competitionFinder: CompetitionFinder;
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(teamRepository) private repository: TeamRepository,
    @Inject(userRepository) userRepository: UserRepository,
    @Inject(competitionRepository)
    competitionRepository: CompetitionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(competitionRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async execute(command: CreateTeamCommand): Promise<Team> {
    const ownerId = UserId.fromString(command.ownerId);
    await this.userFinder.findOrThrow(ownerId);

    const competitionId = CompetitionId.fromString(command.competitionId);
    await this.competitionFinder.findOrThrow(competitionId);

    const teamId = TeamId.generate();
    const name = Name.fromString(command.name);

    const team = Team.add(teamId, ownerId, competitionId, name);

    this.repository.create(team);

    return team;
  }
}
