import { IQuery } from '@nestjs/cqrs';

export class GetDriverQuery implements IQuery {
  constructor(readonly driverId: string) {}
}
