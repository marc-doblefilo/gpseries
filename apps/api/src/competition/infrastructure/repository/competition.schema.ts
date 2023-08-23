import { Schema } from 'mongoose';

const RaceSchema = {
  _id: false,
  id: String,
  name: String,
  date: Date
};

export const CompetitionSchema = new Schema({
  _id: String,
  ownerId: String,
  name: String,
  description: String,
  driversPerTeam: Number,
  races: [RaceSchema]
});
