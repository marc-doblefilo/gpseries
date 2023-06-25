import { InternalTeamDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TeamRepository, teamRepository } from '../../domain';
import { GetTeamsQuery } from './get-teams.query';

@QueryHandler(GetTeamsQuery)
export class GetTeamsHandler implements IQueryHandler<GetTeamsQuery> {
  constructor(@Inject(teamRepository) private repository: TeamRepository) {}

  async execute(): Promise<InternalTeamDTO[]> {
    const teams = await this.repository.findAll();

    return teams.map(team => ({
      id: team.id.value,
      name: team.name.value,
      ownerId: team.ownerId.value,
      competitionId: team.competitionId.value
    }));
  }
}
