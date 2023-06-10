import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository,
  RaceId
} from '../../../competition/domain';
import {
  DriverFinder,
  DriverId,
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import {
  Inscription,
  InscriptionAlreadyExists,
  InscriptionId,
  InscriptionRepository,
  inscriptionRepository,
  Position
} from '../../domain';
import { CreateInscriptionCommand } from './create-inscription.command';

@CommandHandler(CreateInscriptionCommand)
export class CreateInscriptionHandler
  implements ICommandHandler<CreateInscriptionCommand> {
  private readonly driverFinder: DriverFinder;
  constructor(
    @Inject(inscriptionRepository) private repository: InscriptionRepository,
    @Inject(driverRepository) private driverRepository: DriverRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {
    this.driverFinder = new DriverFinder(driverRepository);
  }

  async execute(command: CreateInscriptionCommand): Promise<Inscription> {
    const driverId = DriverId.fromString(command.request.driverId);
    await this.driverFinder.findOrThrow(driverId);

    const raceId = RaceId.fromString(command.request.raceId);
    const isAlreadyInscribed = await this.repository.findByDriverAndRace(
      driverId,
      raceId
    );
    if (isAlreadyInscribed) {
      throw InscriptionAlreadyExists.with(driverId, raceId);
    }

    const competition = await this.competitionRepository.findByRace(raceId);

    if (!competition) {
      CompetitionNotFound.withRace(raceId);
    }

    const inscriptionId = InscriptionId.generate();
    const position = Position.fromPrimitive(command.request.position);

    const inscription = Inscription.add({
      id: inscriptionId,
      raceId,
      driverId,
      position
    });

    this.repository.create(inscription);

    return inscription;
  }
}
