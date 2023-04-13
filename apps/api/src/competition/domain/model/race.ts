import { UserId } from '../../../user/domain';
import { Name } from './name';
import { RaceId } from './race-id';

export class Race {
  private _id: RaceId;
  private _name: Name;
  private _date: Date;
}
