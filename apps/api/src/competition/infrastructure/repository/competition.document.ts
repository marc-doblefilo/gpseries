import { Document } from 'mongoose';

export interface CompetitionDocument extends Document {
  ownerId: string;
  name: string;
  description: string;
  driversPerTeam: number;
}
