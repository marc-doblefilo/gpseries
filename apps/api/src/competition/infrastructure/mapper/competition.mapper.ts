import { UserId } from '../../../user/domain';
import {
  Competition,
  CompetitionDescription,
  CompetitionId,
  Name
} from '../../domain';
import { DriversPerTeam } from '../../domain/model/drivers-per-team';
import { CompetitionDocument } from '../repository/competition.document';

export class CompetitionMapper {
  public static documentToAggregate(document: CompetitionDocument) {
    const { _id, ownerId, name, description, driversPerTeam } = document;

    const competition: Competition = Reflect.construct(Competition, []);
    Reflect.set(competition, '_id', CompetitionId.fromString(_id));
    Reflect.set(competition, '_ownerId', UserId.fromString(ownerId));
    Reflect.set(competition, '_name', Name.fromString(name));
    if (description) {
      Reflect.set(
        competition,
        '_description',
        CompetitionDescription.fromString(description)
      );
    }
    Reflect.set(
      competition,
      '_driversPerTeam',
      DriversPerTeam.fromPrimitive(driversPerTeam)
    );

    return competition;
  }

  public static aggregateToDocument(competition: Competition) {
    return {
      _id: competition.id.value,
      ownerId: competition.ownerId.value,
      name: competition.name.value,
      description: competition.description?.value,
      driversPerTeam: competition.driversPerTeam.value
    };
  }
}
