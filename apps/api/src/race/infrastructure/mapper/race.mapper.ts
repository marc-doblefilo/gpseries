import { CompetitionId } from '../../../competition/domain';
import { Name, Race, RaceId } from '../../domain/model';
import { RaceDocument } from '../repository/race.document';

export class RaceMapper {
  public static documentToAggregate(document: RaceDocument) {
    const { _id, competitionId, name, date } = document;

    const race: Race = Reflect.construct(Race, []);
    Reflect.set(race, '_id', RaceId.fromString(_id));
    Reflect.set(
      race,
      '_competitionId',
      CompetitionId.fromString(competitionId)
    );
    Reflect.set(race, '_name', Name.fromString(name));
    Reflect.set(race, '_date', new Date(date));

    return race;
  }

  public static aggregateToDocument(race: Race) {
    return {
      _id: race.id.value,
      competitionId: race.competitionId.value,
      name: race.name.value,
      date: race.date
    };
  }
}
