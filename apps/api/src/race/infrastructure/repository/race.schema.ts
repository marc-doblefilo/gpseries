import { Schema } from 'mongoose';

export const RaceSchema = new Schema({
  _id: String,
  competitionId: String,
  name: String,
  date: Date,
  deleted: { type: Date, default: undefined }
});

RaceSchema.pre('find', function () {
  this.where({ deleted: undefined });
});

RaceSchema.pre('findOne', function () {
  this.where({ deleted: undefined });
});

RaceSchema.pre('findOneAndUpdate', function () {
  this.where({ deleted: undefined });
});

RaceSchema.pre('findById', function () {
  this.where({ deleted: undefined });
});
