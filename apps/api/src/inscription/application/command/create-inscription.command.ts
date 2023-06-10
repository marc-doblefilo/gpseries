import { ICommand } from '@nestjs/cqrs';

export class CreateInscriptionCommand implements ICommand {
  constructor(
    public readonly request: {
      driverId: string;
      raceId: string;
      position: number;
    }
  ) {}
}
