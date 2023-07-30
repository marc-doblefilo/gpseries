import { ApiProperty } from '@nestjs/swagger';

export class GetInscriptionsByRaceSwaggerDTO {
  @ApiProperty()
  raceId: string;
}

export class GetInscriptionSwaggerDTO {
  @ApiProperty()
  raceId: string;

  @ApiProperty()
  driverId: string;
}
