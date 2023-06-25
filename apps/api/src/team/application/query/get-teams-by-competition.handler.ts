import { TeamDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { DriverRepository, driverRepository } from '../../../driver/domain';
import { TeamRepository, teamRepository } from '../../domain';
import { GetTeamsByCompetitionQuery } from './get-teams-by-competition.query';

@QueryHandler(GetTeamsByCompetitionQuery)
export class GetTeamsByCompetitionHandler
  implements IQueryHandler<GetTeamsByCompetitionQuery> {
  constructor(
    @Inject(teamRepository) private repository: TeamRepository,
    @Inject(driverRepository) private driverRepository: DriverRepository
  ) {}

  async execute(query: GetTeamsByCompetitionQuery): Promise<TeamDTO[]> {
    const competitionId = CompetitionId.fromString(query.competitionId);

    const teams = await this.repository.findByCompetition(competitionId);

    return Promise.all(
      teams.map(async team => {
        const drivers = await this.driverRepository.findAllByTeam(team.id);

        return {
          id: team.id.value,
          name: team.name.value,
          drivers: drivers.map(driver => ({
            id: driver.id.value,
            name: driver.name.value
          }))
        };
      })
    );
  }
}
