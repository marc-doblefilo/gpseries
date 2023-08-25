import { InscriptionDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  CompetitionFinder,
  CompetitionRepository,
  competitionRepository
} from '../../../competition/domain';
import {
  DriverFinder,
  DriverId,
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import { RaceId, RaceRepository, raceRepository } from '../../../race/domain';
import { RaceNotFound } from '../../../race/domain/exception/race-not-found.error';
import {
  InscriptionNotFound,
  InscriptionRepository,
  inscriptionRepository
} from '../../domain';
import { GetInscriptionQuery } from './get-inscription.query';

@QueryHandler(GetInscriptionQuery)
export class GetInscriptionHandler
  implements IQueryHandler<GetInscriptionQuery>
{
  private readonly driverFinder: DriverFinder;

  constructor(
    @Inject(inscriptionRepository) private repository: InscriptionRepository,
    @Inject(raceRepository)
    private raceRepository: RaceRepository,
    @Inject(driverRepository)
    private driverRepository: DriverRepository
  ) {
    this.driverFinder = new DriverFinder(driverRepository);
  }

  async execute(query: GetInscriptionQuery): Promise<InscriptionDTO> {
    const driverId = DriverId.fromString(query.driverId);
    const raceId = RaceId.fromString(query.raceId);

    const race = await this.raceRepository.find(raceId);

    if (!race) {
      throw RaceNotFound.with(raceId);
    }

    await this.driverFinder.findOrThrow(driverId);

    const inscription = await this.repository.findByDriverAndRace(
      driverId,
      raceId
    );

    if (!inscription) {
      throw InscriptionNotFound.with(driverId, raceId);
    }

    return {
      id: inscription.id.value,
      driverId: inscription.driverId.value,
      raceId: inscription.raceId.value,
      position: inscription.position?.value
    };
  }
}
