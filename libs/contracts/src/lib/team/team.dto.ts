export class InternalTeamDTO {
  id: string;
  name: string;
  ownerId: string;
  competitionId: string;
}

class DriverDTO {
  id: string;
  name: string;
}

export class TeamDTO {
  id: string;
  name: string;
  ownerId: string;
  drivers: DriverDTO[];
}
