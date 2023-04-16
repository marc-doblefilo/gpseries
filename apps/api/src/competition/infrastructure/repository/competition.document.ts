import { Document } from 'mongoose';

export interface CompetitionDocument extends Document {
  ownerId: string;
  name: string;
  description: string;
  races: Array<RaceDocument>;
}

export interface RaceDocument {
  id: string;
  name: string;
  date: Date;
}
