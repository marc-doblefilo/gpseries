import { NotFoundError } from '@gpseries/domain';

import { TeamId } from '../model';

export class TeamNotFound extends NotFoundError {
  public static with(id: TeamId): TeamNotFound {
    return new TeamNotFound(`Team with ID <${id.value}> not found`);
  }
}
