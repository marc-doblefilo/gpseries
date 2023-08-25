import { CompetitionNotFound } from '../exception';
import { CompetitionAlreadyExists } from '../exception/competition-already-exists.error';
import { CompetitionId, Name } from '../model';
import { CompetitionRepository } from '../repository';

export class CompetitionFinder {
  constructor(private readonly competitionRepository: CompetitionRepository) {}

  public async findOrThrow(id: CompetitionId) {
    const competition = await this.competitionRepository.find(id);

    if (!competition) {
      throw CompetitionNotFound.with(id);
    }

    return competition;
  }

  public async findByNameOrThrow(name: Name) {
    const competition = await this.competitionRepository.findByName(name);

    if (!competition) {
      throw CompetitionAlreadyExists.with(name);
    }

    return competition;
  }
}
