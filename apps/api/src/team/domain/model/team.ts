import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { UserId } from '../../../user/domain';
import { TeamWasCreated } from '../event/team-was-created.event';
import { Name } from './name';
import { TeamId } from './team-id';

export class Team extends AggregateRoot {
  private _id: TeamId;
  private _name: Name;
  private _ownerId: UserId;
  private _competitionId: CompetitionId;

  private constructor() {
    super();
  }

  public static add(
    id: TeamId,
    ownerId: UserId,
    competitionId: CompetitionId,
    name: Name
  ) {
    const team = new Team();

    team.apply(
      new TeamWasCreated(
        id.value,
        ownerId.value,
        competitionId.value,
        name.value
      )
    );

    return team;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get ownerId() {
    return this._ownerId;
  }

  get competitionId() {
    return this._competitionId;
  }

  private onTeamWasCreated(event: TeamWasCreated) {
    this._id = TeamId.fromString(event.id);
    this._name = Name.fromString(event.name);
    this._ownerId = UserId.fromString(event.ownerId);
    this._competitionId = CompetitionId.fromString(event.competitionId);
  }
}
