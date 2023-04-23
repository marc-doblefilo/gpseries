export class EditCompetitionDTO {
  name: string;
  description: string;
  races: Array<Race>;
}

interface Race {
  name: string;
  date: Date;
}
