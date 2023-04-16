import { Schema } from 'mongoose';

const RaceSchema = {
  id: String,
  name: String,
  date: Date
};

export const CompetitionSchema = new Schema({
  _id: String,
  ownerId: String,
  name: String,
  description: String,
  races: [RaceSchema]
});
