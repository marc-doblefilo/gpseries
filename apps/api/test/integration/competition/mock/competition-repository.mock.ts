import { Nullable } from '@gpseries/domain';
import { jest } from '@jest/globals';

import {
  Competition,
  CompetitionId,
  CompetitionRepository,
  Name
} from '../../../../src/competition/domain';

export class CompetitionMockRepository implements CompetitionRepository {
  private readonly competitions: Competition[] = [];
  public mockCreate = jest.fn((competition: Competition) =>
    this.competitions.push(competition)
  );

  constructor(competitions?: Competition[]) {
    this.competitions = competitions || [];
  }

  create(competition: Competition): void {
    this.mockCreate(competition);
  }

  update(competition: Competition): void {
    const indexToUpdate = this.competitions.findIndex(
      competition => competition.id.value === competition.id.value
    );

    if (indexToUpdate !== -1) {
      this.competitions.splice(indexToUpdate, 1, competition);
    } else {
      throw new Error('Competition not found for update.');
    }
  }

  find(id: CompetitionId): Promise<Nullable<Competition>> {
    const indexToUpdate = this.competitions.findIndex(
      competition => competition.id.value === id.value
    );

    if (indexToUpdate === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.competitions[indexToUpdate]);
  }

  findAll(): Promise<Competition[]> {
    return Promise.resolve(this.competitions);
  }

  findByName(name: Name): Promise<Nullable<Competition>> {
    const indexToUpdate = this.competitions.findIndex(
      competition => competition.name.value === name.value
    );

    if (indexToUpdate === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.competitions[indexToUpdate]);
  }
}
