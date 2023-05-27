import { Schema } from 'mongoose';

export const TeamSchema = new Schema({
  _id: String,
  name: String,
  ownerId: String,
  competitionId: String
});
