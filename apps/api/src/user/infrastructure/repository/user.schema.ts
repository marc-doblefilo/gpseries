import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  roles: [String],
});