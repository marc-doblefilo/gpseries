import { Schema } from 'mongoose';

export const RaceSchema = new Schema({
  _id: String,
  competitionId: String,
  name: String,
  date: Date
});
