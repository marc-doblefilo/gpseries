import { IQuery } from '@nestjs/cqrs';

export class GetNotificationsByUser implements IQuery {
  public constructor(public readonly userId: string) {}
}
