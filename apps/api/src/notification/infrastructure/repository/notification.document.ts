import { Document } from 'mongoose';

export interface NotificationDocument extends Document {
  competitionId: string;
  message: string;
  timestamp: Date;
}
