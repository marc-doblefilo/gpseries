import { ApiProperty } from '@nestjs/swagger';

export class GetDriversByTeamSwaggerDTO {
  @ApiProperty()
  teamId: string;
}
