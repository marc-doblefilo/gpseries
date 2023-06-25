import { Nullable } from '@gpseries/domain';

import { CompetitionId } from '../../../competition/domain';
import { Team, TeamId } from '../model';

export interface TeamRepository {
  create(team: Team): void;
  find(id: TeamId): Promise<Nullable<Team>>;
  findAll(): Promise<Team[]>;
  findByCompetition(id: CompetitionId): Promise<Team[]>;
}

export const teamRepository = 'teamRepository';
