import { NotFoundError } from '@gpseries/domain';

import { Name } from '../model';

export class CompetitionAlreadyExists extends NotFoundError {
  public static with(name: Name): CompetitionAlreadyExists {
    return new CompetitionAlreadyExists(
      `Competition with name <${name.value}> already exists`
    );
  }
}
