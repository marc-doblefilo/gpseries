import { CompetitionId, Name } from '../model';

export class DriverAlreadyRegisteredError extends Error {
  public static with(name: Name, competitionId: CompetitionId) {
    return new DriverAlreadyRegisteredError(
      `<${name.value}> is already registered as a driver in Team <${competitionId.value}>`
    );
  }
}
