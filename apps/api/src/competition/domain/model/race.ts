import { Name } from './name';
import { RaceId } from './race-id';

export class Race {
  private _id: RaceId;
  private _name: Name;
  private _date: Date;

  constructor(id: RaceId, name: Name, date: Date) {
    this._id = id;
    this._name = name;
    this._date = date;
  }

  get id(): RaceId {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get date(): Date {
    return this._date;
  }
}
