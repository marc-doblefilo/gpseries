import { faker } from '@faker-js/faker';

import {
  Competition,
  CompetitionDescription,
  CompetitionId,
  DriversPerTeam,
  Name
} from '../../../../src/competition/domain';
import { UserId } from '../../../../src/user/domain';

export class CompetitionBuilder {
  private id: CompetitionId = CompetitionId.generate();
  private ownerId: UserId = UserId.generate();
  private name: Name = Name.fromString(faker.lorem.word());
  private description: CompetitionDescription =
    CompetitionDescription.fromString(faker.lorem.words());
  private driversPerTeam: DriversPerTeam = DriversPerTeam.fromPrimitive(
    faker.number.int({ min: 1, max: 10 })
  );

  public static aCompetition(): CompetitionBuilder {
    return new CompetitionBuilder();
  }

  public build(): Competition {
    const competition: Competition = Reflect.construct(Competition, []);
    Reflect.set(competition, '_id', this.id);
    Reflect.set(competition, '_ownerId', this.ownerId);
    Reflect.set(competition, '_name', this.name);
    if (this.description) {
      Reflect.set(competition, '_description', this.description);
    }
    Reflect.set(competition, '_driversPerTeam', this.description);

    return competition;
  }
}
