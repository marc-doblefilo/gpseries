import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import { Inscription, InscriptionId, Position } from '../../domain';
import { InscriptionDocument } from '../repository';

export class InscriptionMapper {
  public static documentToAggregate(
    document: InscriptionDocument
  ): Inscription {
    const { _id, position, driverId, raceId } = document;

    const inscription: Inscription = Reflect.construct(Inscription, []);
    Reflect.set(inscription, '_id', InscriptionId.fromString(_id));
    Reflect.set(inscription, '_driverId', DriverId.fromString(driverId));
    Reflect.set(inscription, '_raceId', RaceId.fromString(raceId));
    Reflect.set(
      inscription,
      '_position',
      position ? Position.fromPrimitive(position) : null
    );

    return inscription;
  }

  public static aggregateToDocument(inscription: Inscription) {
    return {
      _id: inscription.id.value,
      driverId: inscription.driverId.value,
      raceId: inscription.raceId.value,
      position: inscription.position?.value
    } as InscriptionDocument;
  }
}
