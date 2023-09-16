import { faker } from '@faker-js/faker';

import { CompetitionId } from '../../../../src/competition/domain';
import { Name, Race, RaceId } from '../../../../src/race/domain';
import { UserId } from '../../../../src/user/domain';

export class RaceBuilder {
  private id: RaceId = RaceId.generate();
  private name: Name = Name.fromString(faker.company.name().slice(0, 20));
  private competitionId: CompetitionId = CompetitionId.generate();
  private ownerId: UserId = UserId.generate();

  public static aRace(): RaceBuilder {
    return new RaceBuilder();
  }

  public withCompetitionId(id: CompetitionId): RaceBuilder {
    this.competitionId = id;

    return this;
  }

  public build(): Race {
    const race: Race = Reflect.construct(Race, []);
    Reflect.set(race, '_id', this.id);
    Reflect.set(race, '_name', this.name);
    Reflect.set(race, '_competitionId', this.competitionId);
    Reflect.set(race, '_ownerId', this.ownerId);

    return race;
  }
}
