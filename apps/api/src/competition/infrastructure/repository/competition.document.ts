import { Document } from 'mongoose';

export interface CompetitionDocument extends Document {
  ownerId: string;
  name: string;
  description: string;
  races: Array<RaceDocument>;
  driversPerTeam: number;
}

export interface RaceDocument {
  id: string;
  name: string;
  date: Date;
}
