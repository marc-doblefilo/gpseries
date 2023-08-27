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
  DriverRepository,
  driverRepository
} from '../../../driver/domain';
import { RaceId, RaceRepository, raceRepository } from '../../../race/domain';
import { RaceNotFound } from '../../../race/domain/exception/race-not-found.error';
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
    @Inject(raceRepository)
    private raceRepository: RaceRepository,
    @Inject(competitionRepository)
    private competitionRepository: CompetitionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(competitionRepository);
  }

  async execute(query: GetInscriptionsByRaceQuery): Promise<InscriptionDTO[]> {
    const raceId = RaceId.fromString(query.raceId);

    const race = await this.raceRepository.find(raceId);

    if (!race) {
      throw RaceNotFound.with(raceId);
    }

    const inscriptions = await this.repository.findByRace(raceId);

    return inscriptions.map(inscription => ({
      id: inscription.id.value,
      driverId: inscription.driverId.value,
      raceId: inscription.raceId.value,
      position: inscription.position?.value
    }));
  }
}
