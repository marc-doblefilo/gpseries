import { Schema } from 'mongoose';

export const IncidentSchema = new Schema({
  _id: String,
  raceId: String,
  description: String,
  driversId: [String]
});
