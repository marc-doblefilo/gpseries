import { TeamDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { TeamRepository, teamRepository } from '../../domain';
import { GetTeamsByCompetitionQuery } from './get-teams-by-competition.query';

@QueryHandler(GetTeamsByCompetitionQuery)
export class GetTeamsByCompetitionHandler
  implements IQueryHandler<GetTeamsByCompetitionQuery> {
  constructor(@Inject(teamRepository) private repository: TeamRepository) {}

  async execute(query: GetTeamsByCompetitionQuery): Promise<TeamDTO[]> {
    const competitionId = CompetitionId.fromString(query.competitionId);

    const teams = await this.repository.findByCompetition(competitionId);

    return teams.map(team => ({
      id: team.id.value,
      name: team.name.value,
      ownerId: team.ownerId.value,
      competitionId: team.competitionId.value
    }));
  }
}
