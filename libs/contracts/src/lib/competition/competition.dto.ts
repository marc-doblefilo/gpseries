export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  driversPerTeam: number;
  races: Array<RaceDTO>;
  pointsSystem: StandingPointDTO[];
}

class RaceDTO {
  id: string;
  name: string;
  date: Date;
}

class StandingPointDTO {
  position: number;
  points: number;
}
