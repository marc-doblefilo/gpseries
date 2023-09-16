import { Nullable } from '@gpseries/domain';
import { jest } from '@jest/globals';

import { CompetitionId } from '../../../../src/competition/domain';
import {
  Name,
  Race,
  RaceId,
  RaceRepository
} from '../../../../src/race/domain';

export class RaceMockRepository implements RaceRepository {
  private readonly races: Race[] = [];
  public mockCreate = jest.fn((race: Race) => this.races.push(race));

  create(race: Race): void {
    this.mockCreate(race);
  }

  delete(race: Race): void {
    const index = this.races.indexOf(race);

    this.races.splice(index, 1);
  }

  find(id: RaceId): Promise<Nullable<Race>> {
    const race = this.races.filter(race => race.id.value === id.value)[0];

    if (!race) {
      return Promise.resolve(null);
    }

    return Promise.resolve(race);
  }

  findByCompetition(competitionId: CompetitionId): Promise<Race[]> {
    const races = this.races.filter(
      race => race.competitionId.value === competitionId.value
    );

    return Promise.resolve(races);
  }

  findByNameAndCompetition(
    name: Name,
    competitionId: CompetitionId
  ): Promise<Nullable<Race>> {
    const race = this.races.filter(
      race =>
        race.name.value === name.value &&
        race.competitionId.value === competitionId.value
    )[0];

    if (!race) {
      return Promise.resolve(null);
    }

    return Promise.resolve(race);
  }
}
