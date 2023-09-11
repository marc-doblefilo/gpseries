import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationsSwaggerDTO {
  @ApiProperty()
  userId: string;
}
