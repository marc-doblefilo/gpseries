import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  DriverFinder,
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import {
  InscriptionId,
  InscriptionRepository,
  inscriptionRepository,
  Position
} from '../../domain';
import { AddResultsCommand } from './add-results.command';

@CommandHandler(AddResultsCommand)
export class AddResultsHandler implements ICommandHandler<AddResultsCommand> {
  private readonly driverFinder: DriverFinder;
  constructor(
    @Inject(inscriptionRepository) private repository: InscriptionRepository,
    @Inject(driverRepository) private driverRepository: DriverRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {
    this.driverFinder = new DriverFinder(driverRepository);
  }

  async execute(command: AddResultsCommand): Promise<void> {
    command.request.map(async result => {
      const id = InscriptionId.fromString(result.inscriptionId);
      const position = Position.fromPrimitive(result.position);

      const inscription = await this.repository.find(id);

      if (!inscription) {
        return null;
      }

      inscription.addResult(position);

      this.repository.update(inscription);
    });
  }
}
