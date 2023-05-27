import { Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  ownerId: string;
  competitionId: string;
}
