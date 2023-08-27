import { ICommand } from '@nestjs/cqrs';

export class DeleteRaceCommand implements ICommand {
  constructor(public readonly id: string) {}
}
