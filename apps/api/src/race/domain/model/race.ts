import { AggregateRoot } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { RaceWasCreated } from '../event/race-was-created.event';
import { Name } from './name';
import { RaceId } from './race-id';

export class Race extends AggregateRoot {
  private _id: RaceId;
  private _competitionId: CompetitionId;
  private _name: Name;
  private _date: Date;
  private _deleted?: Date;

  constructor() {
    super();
  }

  get id(): RaceId {
    return this._id;
  }

  get competitionId(): CompetitionId {
    return this._competitionId;
  }

  get name(): Name {
    return this._name;
  }

  get date(): Date {
    return this._date;
  }

  public static add(
    id: RaceId,
    competitionId: CompetitionId,
    name: Name,
    date: Date
  ) {
    const race = new Race();

    race.apply(
      new RaceWasCreated(id.value, competitionId.value, name.value, date)
    );

    return race;
  }

  private onRaceWasCreated(event: RaceWasCreated) {
    this._id = RaceId.fromString(event.id);
    this._competitionId = CompetitionId.fromString(event.competitionId);
    this._name = Name.fromString(event.name);
    this._date = event.date;

    this._deleted = undefined;
  }
}
