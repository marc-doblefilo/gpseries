import { NotFoundError } from '@gpseries/domain';

import { RaceId } from '../model';

export class RaceNotFound extends NotFoundError {
  public static with(id: RaceId): RaceNotFound {
    return new RaceNotFound(`Race with ID <${id.value}> not found`);
  }
}
