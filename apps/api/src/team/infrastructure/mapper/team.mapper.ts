import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { Name, Team, TeamId } from '../../domain';
import { TeamDocument } from '../repository/team.document';

export class TeamMapper {
  public static documentToAggregate(document: TeamDocument): Team {
    const { _id, name, ownerId, competitionId } = document;

    const team: Team = Reflect.construct(Team, []);
    Reflect.set(team, '_id', TeamId.fromString(_id));
    Reflect.set(team, '_name', Name.fromString(name));
    Reflect.set(
      team,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(team, '_ownerId', UserId.fromString(ownerId));

    return team;
  }

  public static aggregateToDocument(team: Team) {
    return {
      _id: team.id.value,
      name: team.name.value,
      competitionId: team.competitionId.value,
      ownerId: team.ownerId.value
    };
  }
}
