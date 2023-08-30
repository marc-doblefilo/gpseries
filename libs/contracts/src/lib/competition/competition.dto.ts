export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  driversPerTeam: number;
  races: Array<CompetitionRaceDTO>;
  pointsSystem: StandingPointDTO[];
}

export class CompetitionRaceDTO {
  id: string;
  name: string;
  date: Date;
}

class StandingPointDTO {
  position: number;
  points: number;
}
