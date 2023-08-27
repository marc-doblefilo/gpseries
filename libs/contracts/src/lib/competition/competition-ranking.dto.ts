import { DriverDTO } from '../driver';
import { InscriptionDTO } from '../inscription';
import { InternalTeamDTO } from '../team';
import { CompetitionDTO } from './competition.dto';

export class CompetitionRankingDTO {
  competition: CompetitionDTO;
  drivers: {
    driver: DriverDTO;
    team: InternalTeamDTO;
    points: number;
    inscriptions: InscriptionDTO[];
  }[];
}
