import {
  CompetitionDTO,
  CompetitionRankingDTO,
  CreateCompetitionDTO,
  CreateRaceDTO,
  EditCompetitionDTO,
  RaceDTO,
  Role
} from '@gpseries/contracts';
import { NotFoundError, Nullable } from '@gpseries/domain';
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
  GetCompetitionQuery
} from '../../application';
import { GetCompetitionRankingQuery } from '../../application/query/get-competition-ranking-query';
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
        new CreateCompetitionCommand(
          dto.ownerId,
          dto.name,
          dto.description,
          dto.driversPerTeam
        )
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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Competition found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<CompetitionDTO> {
    try {
      return await this.queryBus.execute<GetCompetitionQuery, CompetitionDTO>(
        new GetCompetitionQuery(id)
      );
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

  @Get(':id/ranking')
  @ApiResponse({ status: 200, description: 'Competition found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findRanking(@Param('id') id: string): Promise<CompetitionRankingDTO> {
    try {
      return await this.queryBus.execute<
        GetCompetitionRankingQuery,
        CompetitionRankingDTO
      >(new GetCompetitionRankingQuery(id));
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
