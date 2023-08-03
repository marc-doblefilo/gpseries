import { ICommand } from '@nestjs/cqrs';

export class AddResultsCommand implements ICommand {
  constructor(
    public readonly request: {
      inscriptionId: string;
      position: number;
    }[]
  ) {}
}
