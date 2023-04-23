import { Document } from 'mongoose';

export interface DriverDocument extends Document {
  userId: string;
  competitionId: string;
  points: number;
}
