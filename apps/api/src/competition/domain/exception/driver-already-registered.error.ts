import { TeamId } from '../../../team/domain';
import { Name } from '../model';

export class DriverAlreadyRegisteredError extends Error {
  public static with(name: Name, teamId: TeamId) {
    return new DriverAlreadyRegisteredError(
      `<${name.value}> is already registered as a driver in Team <${teamId.value}>`
    );
  }
}
