import { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  name: string;
  password: string;
  roles: Array<string>;
}