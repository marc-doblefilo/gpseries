import { InscriptionDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  CompetitionFinder,
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
  InscriptionNotFound,
  InscriptionRepository,
  inscriptionRepository
} from '../../domain';
import { GetInscriptionQuery } from './get-inscription.query';

@QueryHandler(GetInscriptionQuery)
export class GetInscriptionHandler
  implements IQueryHandler<GetInscriptionQuery>
{
  private readonly competitionFinder: CompetitionFinder;
  private readonly driverFinder: DriverFinder;

  constructor(
    @Inject(inscriptionRepository) private repository: InscriptionRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository,
    @Inject(driverRepository)
    private driverRepository: DriverRepository
  ) {
    this.competitionFinder = new CompetitionFinder(competitionRepository);
    this.driverFinder = new DriverFinder(driverRepository);
  }

  async execute(query: GetInscriptionQuery): Promise<InscriptionDTO> {
    console.info(query);
    const driverId = DriverId.fromString(query.driverId);
    const raceId = RaceId.fromString(query.raceId);

    await this.competitionFinder.findByRaceOrThrow(raceId);
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
