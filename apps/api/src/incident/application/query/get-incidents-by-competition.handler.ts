import { IncidentDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { RaceRepository, raceRepository } from '../../../race/domain';
import { IncidentRepository, incidentRepository } from '../../domain';
import { GetIncidentsByCompetitionQuery } from './get-incidents-by-competition.query';

@QueryHandler(GetIncidentsByCompetitionQuery)
export class GetIncidentsByCompetitionHandler
  implements IQueryHandler<GetIncidentsByCompetitionQuery>
{
  constructor(
    @Inject(incidentRepository) private repository: IncidentRepository,
    @Inject(raceRepository)
    private raceRepository: RaceRepository
  ) {}

  async execute(query: GetIncidentsByCompetitionQuery): Promise<IncidentDTO[]> {
    const competitionId = CompetitionId.fromString(query.competitionId);

    const races = await this.raceRepository.findByCompetition(competitionId);

    const incidents = (
      await Promise.all(races.map(race => this.repository.findByRace(race.id)))
    ).flat();

    return incidents.map(incident => ({
      id: incident.id.value,
      raceId: incident.raceId.value,
      driversId: incident.driversId.map(id => id.value),
      description: incident.description.value
    }));
  }
}
