export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  driversPerTeam: number;
  races: Array<RaceDTO>;
}

class RaceDTO {
  id: string;
  name: string;
  date: Date;
}
