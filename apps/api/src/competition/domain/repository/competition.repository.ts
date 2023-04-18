import { Competition } from '../model';

export interface CompetitionRepository {
  save(competition: Competition): void;
  findAll(): Promise<Competition[]>;
}

export const competitionRepository = 'competitionRepository';
