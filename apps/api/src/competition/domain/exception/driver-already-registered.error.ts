import { UserId } from '../../../user/domain';
import { CompetitionId } from '../model';

export class DriverAlreadyRegisteredError extends Error {
  public static with(userId: UserId, competitionId: CompetitionId) {
    return new DriverAlreadyRegisteredError(
      `User with ID <${userId.value}> is already registered as a driver in Competition <${competitionId.value}>`
    );
  }
}
