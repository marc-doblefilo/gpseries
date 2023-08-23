import {
  CompetitionDTO,
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
  GetCompetitionQuery,
  UpdateCompetitionCommand
} from '../../application';
import { AddRaceCommand } from '../../application/command/add-race.command';
import { GetCompetitionsQuery } from '../../application/query/get-competitions.query';
import { GetNextRaceQuery } from '../../application/query/get-next-race.query';
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
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id/upcoming-race')
  @ApiResponse({ status: 200, description: 'Next race found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async nextRace(@Param('id') id: string): Promise<Nullable<RaceDTO>> {
    try {
      return await this.queryBus.execute<GetNextRaceQuery, RaceDTO>(
        new GetNextRaceQuery(id)
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

  @Post(':id/race')
  @ApiResponse({ status: 201, description: 'Race created' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async addRace(
    @Param('id') id: string,
    @Body() dto: CreateRaceDTO
  ): Promise<Nullable<CompetitionDTO>> {
    try {
      return await this.commandBus.execute(
        new AddRaceCommand(id, dto.name, dto.date)
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
}
