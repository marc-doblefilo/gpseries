export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  driversPerTeam: number;
  races: Array<RaceDTO>;
}

export class RaceDTO {
  id: string;
  name: string;
  date: Date;
}
