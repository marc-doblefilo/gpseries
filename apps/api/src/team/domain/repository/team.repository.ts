import { Nullable } from '@gpseries/domain';

import { Team, TeamId } from '../model';

export interface TeamRepository {
  create(team: Team): void;
  find(id: TeamId): Promise<Nullable<Team>>;
}

export const teamRepository = 'teamRepository';
