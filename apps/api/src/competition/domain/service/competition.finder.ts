import { CompetitionNotFound } from '../exception';
import { CompetitionId } from '../model';
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
}
