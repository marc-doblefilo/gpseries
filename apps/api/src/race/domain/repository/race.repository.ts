import { Nullable } from '@gpseries/domain';

import { CompetitionId } from '../../../competition/domain';
import { Name, Race, RaceId } from '../model';

export interface RaceRepository {
  create(race: Race): void;
  delete(race: Race): void;
  findByCompetition(competitionId: CompetitionId): Promise<Race[]>;
  findByNameAndCompetition(
    name: Name,
    competitionId: CompetitionId
  ): Promise<Nullable<Race>>;
  find(id: RaceId): Promise<Nullable<Race>>;
}

export const raceRepository = 'raceRepository';
