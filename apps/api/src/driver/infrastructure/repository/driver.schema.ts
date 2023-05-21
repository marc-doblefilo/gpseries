import { Schema } from 'mongoose';

export const DriverSchema = new Schema({
  _id: String,
  name: String,
  competitionId: String,
  points: Number
});
