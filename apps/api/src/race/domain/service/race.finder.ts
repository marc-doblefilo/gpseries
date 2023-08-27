import { RaceNotFound } from '../exception/race-not-found.error';
import { RaceId } from '../model';
import { RaceRepository } from '../repository';

export class RaceFinder {
  constructor(private readonly repository: RaceRepository) {}

  public async findOrThrow(id: RaceId) {
    const race = await this.repository.find(id);

    if (!race) {
      throw RaceNotFound.with(id);
    }

    return race;
  }
}
