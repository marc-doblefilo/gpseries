import { Document } from 'mongoose';

export interface InscriptionDocument extends Document {
  driverId: string;
  raceId: string;
  position: number | null;
}
