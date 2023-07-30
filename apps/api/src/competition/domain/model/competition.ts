import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../user/domain';
import { RaceWasAdded } from '../event';
import { CompetitionWasCreated } from '../event/competition-was-created.event';
import { CompetitionDescription } from './competition-description';
import { CompetitionId } from './competition-id';
import { Name } from './name';
import { Race } from './race';
import { RaceId } from './race-id';

export class Competition extends AggregateRoot {
  private _id: CompetitionId;
  private _ownerId: UserId;
  private _name: Name;
  private _description: CompetitionDescription;
  private _races: Array<Race>;
  private _closed?: Date;
  private _deleted?: Date;

  private constructor() {
    super();
  }

  public static add(
    id: CompetitionId,
    ownerId: UserId,
    name: Name,
    description: CompetitionDescription
  ) {
    const competition = new Competition();

    competition.apply(
      new CompetitionWasCreated(
        id.value,
        ownerId.value,
        name.value,
        description.value
      )
    );

    return competition;
  }

  get id(): CompetitionId {
    return this._id;
  }

  get ownerId(): UserId {
    return this._ownerId;
  }

  get name(): Name {
    return this._name;
  }

  get description(): CompetitionDescription {
    return this._description;
  }

  get races(): Array<Race> {
    return this._races;
  }

  hasRace(race: Race): boolean {
    return this._races.some((item: Race) => item.name.equals(race.name));
  }

  addRace(race: Race) {
    if (this.hasRace(race)) {
      return;
    }

    this.apply(
      new RaceWasAdded(race.id.value, race.id.value, race.name.value, race.date)
    );
  }

  private onCompetitionWasCreated(event: CompetitionWasCreated) {
    this._id = CompetitionId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._name = Name.fromString(event.name);
    this._description = CompetitionDescription.fromString(event.description);

    this._closed = undefined;
    this._deleted = undefined;
  }

  private onRaceWasAdded(event: RaceWasAdded) {
    const id = RaceId.fromString(event.id);
    const name = Name.fromString(event.raceName);
    const date = event.raceDate;

    const race = new Race(id, name, date);

    this._races.push(race);
  }
}
