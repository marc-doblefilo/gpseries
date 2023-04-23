import { Schema } from 'mongoose';

export const DriverSchema = new Schema({
  _id: String,
  userId: String,
  competitionId: String,
  points: Number
});
