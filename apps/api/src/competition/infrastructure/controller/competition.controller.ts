import {
  CompetitionDTO,
  CreateCompetitionDTO,
  EditCompetitionDTO,
  Role
} from '@gpseries/contracts';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '../../../auth/security/roles.decorator';
import {
  CreateCompetitionCommand,
  GetCompetitionQuery,
  UpdateCompetitionCommand
} from '../../application';
import { GetCompetitionsQuery } from '../../application/query/get-competitions.query';
import { CompetitionNotFound } from '../../domain';

@ApiBearerAuth()
@ApiTags('competitions')
@Controller('competitions')
@UseInterceptors(ClassSerializerInterceptor)
export class CompetitionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Competition created' })
  async create(@Body() dto: CreateCompetitionDTO): Promise<CompetitionDTO> {
    try {
      return await this.commandBus.execute(
        new CreateCompetitionCommand(dto.ownerId, dto.name, dto.description)
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Competitions found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const competitions = await this.queryBus.execute<
        GetCompetitionsQuery,
        CompetitionDTO[]
      >(new GetCompetitionsQuery());

      res.setHeader('X-Total-Count', competitions.length);

      return competitions;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update competition' })
  @ApiResponse({ status: 200, description: 'competition updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: EditCompetitionDTO
  ): Promise<CompetitionDTO> {
    try {
      return await this.commandBus.execute(
        new UpdateCompetitionCommand(id, dto.name, dto.description, dto.races)
      );
    } catch (e) {
      if (e instanceof CompetitionNotFound) {
        throw new NotFoundException(e.message);
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Competition found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<CompetitionDTO> {
    try {
      return await this.queryBus.execute<GetCompetitionQuery, CompetitionDTO>(
        new GetCompetitionQuery(id)
      );
    } catch (e) {
      if (e instanceof CompetitionNotFound) {
        throw new NotFoundException(e.message);
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
