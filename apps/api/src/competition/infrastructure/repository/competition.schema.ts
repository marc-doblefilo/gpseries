import { Schema } from 'mongoose';

export const CompetitionSchema = new Schema({
  _id: String,
  ownerId: String,
  name: String,
  description: String,
  driversPerTeam: Number
});
