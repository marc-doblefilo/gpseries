import { CreateDriverDTO, DriverDTO, Role } from '@gpseries/contracts';
import { NotFoundError } from '@gpseries/domain';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '../../../auth/security/roles.decorator';
import { CreateDriverCommand, GetDriversQuery } from '../../application';

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
        new CreateDriverCommand(dto.name, dto.teamId)
      );

      return {
        id: driver.id.value,
        name: driver.name.value,
        teamId: driver.teamId.value
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

  @Get()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Drivers found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const drivers = await this.queryBus.execute<GetDriversQuery, DriverDTO[]>(
        new GetDriversQuery()
      );

      res.setHeader('X-Total-Count', drivers.length);

      return drivers;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
