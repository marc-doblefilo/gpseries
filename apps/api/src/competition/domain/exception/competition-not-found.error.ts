import { NotFoundError } from '@gpseries/domain';

import { CompetitionId } from '../model';

export class CompetitionNotFound extends NotFoundError {
  public static with(id: CompetitionId): CompetitionNotFound {
    return new CompetitionNotFound(
      `Competition with ID <${id.value}> not found`
    );
  }
}
