export class CompetitionDTO {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  races: Array<Race>;
}

class Race {
  id: string;
  name: string;
  date: Date;
}
