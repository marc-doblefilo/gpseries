import { Team } from '../model';

export interface TeamRepository {
  find(): Promise<Team[]>;
}

export const teamRepository = 'teamRepository';
