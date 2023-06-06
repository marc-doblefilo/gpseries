import { TeamDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  TeamFinder,
  TeamId,
  TeamRepository,
  teamRepository
} from '../../domain';
import { GetTeamQuery } from './get-team.query';

@QueryHandler(GetTeamQuery)
export class GetTeamHandler implements IQueryHandler<GetTeamQuery> {
  private readonly teamFinder: TeamFinder;

  constructor(@Inject(teamRepository) private repository: TeamRepository) {
    this.teamFinder = new TeamFinder(repository);
  }

  async execute(query: GetTeamQuery): Promise<TeamDTO> {
    const id = TeamId.fromString(query.id);
    const team = await this.teamFinder.findOrThrow(id);

    return {
      id: team.id.value,
      name: team.name.value,
      ownerId: team.ownerId.value,
      competitionId: team.competitionId.value
    } as TeamDTO;
  }
}
