import { NotFoundError } from '@gpseries/domain';

import { CompetitionId, RaceId } from '../model';

export class CompetitionNotFound extends NotFoundError {
  public static with(id: CompetitionId): CompetitionNotFound {
    return new CompetitionNotFound(
      `Competition with ID <${id.value}> not found`
    );
  }

  public static withRace(id: RaceId): CompetitionNotFound {
    return new CompetitionNotFound(
      `Competition with race <${id.value}> not found`
    );
  }
}
