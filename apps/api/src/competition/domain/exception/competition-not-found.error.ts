import { CompetitionId } from '../model';

export class CompetitionNotFound extends Error {
  public static with(id: CompetitionId): CompetitionNotFound {
    return new CompetitionNotFound(
      `Competition with ID <${id.value}> not found`
    );
  }
}
