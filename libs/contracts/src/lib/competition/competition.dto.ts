export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  races: Array<RaceDTO>;
}

export class RaceDTO {
  id: string;
  name: string;
  date: Date;
}
