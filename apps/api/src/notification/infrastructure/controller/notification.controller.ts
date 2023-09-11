import { NotificationDTO } from '@gpseries/contracts';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetNotificationsByUser } from '../../application/query/get-notifications-by-user.query';
import { GetNotificationsSwaggerDTO } from './swagger.dto';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('notifications')
@UseInterceptors(ClassSerializerInterceptor)
export class NotificationController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('/by-user')
  @ApiQuery({ type: GetNotificationsSwaggerDTO })
  @ApiResponse({ status: 200, description: 'Notifications found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async gerNotificationsByUser(
    @Query() query: { userId: string }
  ): Promise<NotificationDTO[]> {
    try {
      const notifications = await this.queryBus.execute<
        GetNotificationsByUser,
        NotificationDTO[]
      >(new GetNotificationsByUser(query.userId));

      return notifications;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
