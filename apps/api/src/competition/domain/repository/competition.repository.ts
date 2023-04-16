import { Competition } from '../model';

export interface CompetitionRepository {
  save(competition: Competition): void;
}

export const competitionRepository = 'competitionRepository';
