import { Document } from 'mongoose';

export interface RaceDocument extends Document {
  competitionId: string;
  name: string;
  date: Date;
}
