import { TeamNotFound } from '../exception/team-not-found.error';
import { TeamId } from '../model';
import { TeamRepository } from '../repository';

export class TeamFinder {
  constructor(private readonly teamRepository: TeamRepository) {}

  public async findOrThrow(id: TeamId) {
    const team = await this.teamRepository.find(id);

    if (!team) {
      throw TeamNotFound.with(id);
    }

    return team;
  }
}
