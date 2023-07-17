import { RaceDTO } from '@gpseries/contracts';
import { Nullable } from '@gpseries/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  CompetitionFinder,
  CompetitionId,
  CompetitionNotFound,
  CompetitionRepository,
  competitionRepository
} from '../../domain';
import { GetNextRaceQuery } from './get-next-race.query';

@QueryHandler(GetNextRaceQuery)
export class GetNextRaceHandler implements IQueryHandler<GetNextRaceQuery> {
  private readonly competitionFinder: CompetitionFinder;

  constructor(
    @Inject(competitionRepository) private repository: CompetitionRepository
  ) {
    this.competitionFinder = new CompetitionFinder(repository);
  }

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetNextRaceQuery
  ): Promise<Nullable<RaceDTO>> {
    const now = new Date();
    const id = CompetitionId.fromString(query.id);
    const competition = await this.competitionFinder.findOrThrow(id);

    const upcomingRaces = competition.races.filter(race => race.date > now);

    const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0] : null;

    if (!nextRace) {
      return null;
    }

    return {
      id: nextRace.id.value,
      date: nextRace.date,
      name: nextRace.name.value
    };
  }
}
