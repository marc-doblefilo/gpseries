import { Schema } from 'mongoose';

export const NotificationSchema = new Schema({
  _id: String,
  competitionId: String,
  message: String,
  timestamp: Date
});
