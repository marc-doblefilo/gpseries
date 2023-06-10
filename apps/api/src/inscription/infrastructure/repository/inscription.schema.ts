import { Schema } from 'mongoose';

export const InscriptionSchema = new Schema({
  _id: String,
  driverId: String,
  raceId: String,
  position: Number
});
