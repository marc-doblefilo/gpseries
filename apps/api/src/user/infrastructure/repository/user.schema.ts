import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  username: String,
  name: String,
  password: String,
  roles: [String],
});