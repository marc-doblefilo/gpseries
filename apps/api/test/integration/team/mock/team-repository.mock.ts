import { Nullable } from '@gpseries/domain';
import { jest } from '@jest/globals';

import { CompetitionId } from '../../../../src/competition/domain';
import { Team, TeamId, TeamRepository } from '../../../../src/team/domain';

export class TeamMockRepository implements TeamRepository {
  private readonly teams: Team[] = [];
  public mockCreate = jest.fn((team: Team) => this.teams.push(team));

  create(team: Team): void {
    this.mockCreate(team);
  }

  find(id: TeamId): Promise<Nullable<Team>> {
    const team = this.teams.filter(team => team.id.value === id.value);

    if (team.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(team[0]);
  }

  findAll(): Promise<Team[]> {
    return Promise.resolve(this.teams);
  }

  findByCompetition(id: CompetitionId): Promise<Team[]> {
    const team = this.teams.filter(
      team => team.competitionId.value === id.value
    );

    return Promise.resolve(team);
  }
}
