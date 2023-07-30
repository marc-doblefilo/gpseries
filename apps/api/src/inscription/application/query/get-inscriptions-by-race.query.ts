import { IQuery } from '@nestjs/cqrs';

export class GetInscriptionsByRaceQuery implements IQuery {
  public constructor(public readonly raceId: string) {}
}
