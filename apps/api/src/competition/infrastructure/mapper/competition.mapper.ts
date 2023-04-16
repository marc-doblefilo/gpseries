import { CompetitionDTO } from '@gpseries/contracts';

import { UserId } from '../../../user/domain';
import {
  Competition,
  CompetitionDescription,
  CompetitionId,
  Name,
  Race,
  RaceId
} from '../../domain';
import {
  CompetitionDocument,
  RaceDocument
} from '../repository/competition.document';

export class CompetitionMapper {
  static documentToDTO(document: CompetitionDocument): CompetitionDTO {
    const { _id, ownerId, name, description, races } = document;
    return {
      id: _id,
      ownerId,
      name,
      description,
      races
    };
  }

  public static documentToAggregate(document: CompetitionDocument) {
    const { _id, ownerId, name, description, races } = document;

    const competition: Competition = Reflect.construct(Competition, []);
    Reflect.set(competition, '_id', CompetitionId.fromString(_id));
    Reflect.set(competition, '_ownerId', UserId.fromString(ownerId));
    Reflect.set(competition, '_name', Name.fromString(name));
    Reflect.set(
      competition,
      '_description',
      CompetitionDescription.fromString(description)
    );
    Reflect.set(
      competition,
      '_races',
      races.map((raceDocument: RaceDocument) => {
        const race: Race = Reflect.construct(Race, []);
        Reflect.set(race, '_id', RaceId.fromString(raceDocument.id));
        Reflect.set(race, '_name', Name.fromString(raceDocument.name));
        Reflect.set(race, '_date', raceDocument.date);

        return race;
      })
    );
  }

  public static aggregateToDocument(competition: Competition) {
    return {
      _id: competition.id.value,
      ownerId: competition.ownerId.value,
      name: competition.name.value,
      description: competition.description.value,
      races: competition.races.map((race: Race) => {
        return {
          _id: race.id.value,
          name: race.id.value,
          date: race.date
        };
      })
    };
  }
}
