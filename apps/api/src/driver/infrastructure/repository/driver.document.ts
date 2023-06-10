import { Document } from 'mongoose';

export interface DriverDocument extends Document {
  name: string;
  teamId: string;
}
