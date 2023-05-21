import { Document } from 'mongoose';

export interface DriverDocument extends Document {
  name: string;
  competitionId: string;
  points: number;
}
