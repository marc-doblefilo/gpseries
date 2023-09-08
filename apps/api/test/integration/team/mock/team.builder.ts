import { faker } from '@faker-js/faker';

import { CompetitionId } from '../../../../src/competition/domain';
import { Name, Team, TeamId } from '../../../../src/team/domain';
import { UserId } from '../../../../src/user/domain';

export class TeamBuilder {
  private id: TeamId = TeamId.generate();
  private name: Name = Name.fromString(faker.company.name());
  private ownerId: UserId = UserId.generate();
  private competitionId: CompetitionId = CompetitionId.generate();

  public static aTeam(): TeamBuilder {
    return new TeamBuilder();
  }

  public build(): Team {
    const team: Team = Reflect.construct(Team, []);
    Reflect.set(team, '_id', this.id);
    Reflect.set(team, '_name', this.name);
    Reflect.set(team, '_ownerId', this.ownerId);
    Reflect.set(team, '_competitionId', this.competitionId);

    return team;
  }
}
