import { RaceId } from '../../../race/domain';
import { Incident } from '../model';

export interface IncidentRepository {
  create(incident: Incident): void;
  findByRace(raceId: RaceId): Promise<Incident[]>;
}

export const incidentRepository = 'incidentRepository';
