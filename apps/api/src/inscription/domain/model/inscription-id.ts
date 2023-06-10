import { Id } from '@gpseries/domain';
import * as uuid from 'uuid';

export class InscriptionId extends Id {
  static generate(): InscriptionId {
    return new InscriptionId(uuid.v4());
  }

  public static fromString(id: string): InscriptionId {
    return new InscriptionId(id);
  }
}
