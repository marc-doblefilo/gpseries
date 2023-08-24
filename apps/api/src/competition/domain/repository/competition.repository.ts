import { Nullable } from '@gpseries/domain';

import { Competition, CompetitionId, Name, RaceId } from '../model';

export interface CompetitionRepository {
  create(competition: Competition): void;
  update(competition: Competition): void;
  findAll(): Promise<Competition[]>;
  find(id: CompetitionId): Promise<Nullable<Competition>>;
  findByRace(raceId: RaceId): Promise<Nullable<Competition>>;
  findByName(name: Name): Promise<Nullable<Competition>>;
}

export const competitionRepository = 'competitionRepository';
