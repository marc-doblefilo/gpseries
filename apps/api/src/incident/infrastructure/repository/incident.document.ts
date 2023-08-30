import { Document } from 'mongoose';

export interface IncidentDocument extends Document {
  description: string;
  raceId: string;
  driversId: string[];
}
