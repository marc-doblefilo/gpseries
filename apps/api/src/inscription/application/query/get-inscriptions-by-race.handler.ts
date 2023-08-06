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
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import { InscriptionRepository, inscriptionRepository } from '../../domain';
import { GetInscriptionsByRaceQuery } from './get-inscriptions-by-race.query';

@QueryHandler(GetInscriptionsByRaceQuery)
export class GetInscriptionsByRaceHandler
  implements IQueryHandler<GetInscriptionsByRaceQuery>
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

  async execute(query: GetInscriptionsByRaceQuery): Promise<InscriptionDTO[]> {
    const raceId = RaceId.fromString(query.raceId);

    await this.competitionFinder.findByRaceOrThrow(raceId);

    const inscriptions = await this.repository.findByRace(raceId);

    return inscriptions.map(inscription => ({
      id: inscription.id.value,
      driverId: inscription.driverId.value,
      raceId: inscription.raceId.value,
      position: inscription.position?.value
    }));
  }
}
