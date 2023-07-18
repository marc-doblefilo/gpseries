import { IQuery } from '@nestjs/cqrs';

export class GetInscriptionQuery implements IQuery {
  public constructor(
    public readonly driverId: string,
    public readonly raceId: string
  ) {}
}
