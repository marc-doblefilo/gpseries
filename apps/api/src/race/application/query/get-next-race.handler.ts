import { RaceDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CompetitionId } from '../../../competition/domain';
import { RaceRepository, raceRepository } from '../../domain';
import { GetNextRaceQuery } from './get-next-race.query';

@QueryHandler(GetNextRaceQuery)
export class GetNextRaceHandler implements IQueryHandler<GetNextRaceQuery> {
  constructor(@Inject(raceRepository) private repository: RaceRepository) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetNextRaceQuery
  ): Promise<Nullable<RaceDTO>> {
    const now = new Date();
    const id = CompetitionId.fromString(query.competitionId);

    const races = await this.repository.findByCompetition(id);

    const upcomingRaces = races.filter(race => race.date > now);

    const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0] : null;

    if (!nextRace) {
      return null;
    }

    return {
      id: nextRace.id.value,
      competitionId: id.value,
      date: nextRace.date,
      name: nextRace.name.value
    };
  }
}
