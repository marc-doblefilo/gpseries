import { CreateDriverDTO, DriverDTO, Role } from '@gpseries/contracts';
import { NotFoundError } from '@gpseries/domain';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotFoundException,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../auth/security/roles.decorator';
import { CreateDriverCommand } from '../../application';

@ApiBearerAuth()
@ApiTags('drivers')
@Controller('drivers')
@UseInterceptors(ClassSerializerInterceptor)
export class DriverController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'Competition created' })
  async create(@Body() dto: CreateDriverDTO): Promise<DriverDTO> {
    try {
      const driver = await this.commandBus.execute(
        new CreateDriverCommand(dto.userId, dto.competitionId)
      );

      return {
        id: driver.id.value,
        userId: driver.userId.value,
        competitionId: driver.competitionId.value,
        points: driver.points.value
      } as DriverDTO;
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
