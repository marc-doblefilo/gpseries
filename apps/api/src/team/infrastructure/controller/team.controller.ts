import {
  CreateTeamDTO,
  InternalTeamDTO,
  Role,
  TeamDTO
} from '@gpseries/contracts';
import { NotFoundError } from '@gpseries/domain';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '../../../auth/security/roles.decorator';
import { GetUsersQuery } from '../../../user/application';
import { CreateTeamCommand } from '../../application/command/create-team.command';
import { GetTeamQuery } from '../../application/query/get-team.query';
import { GetTeamsQuery } from '../../application/query/get-teams.query';
import { GetTeamsByCompetitionQuery } from '../../application/query/get-teams-by-competition.query';

@ApiBearerAuth()
@ApiTags('teams')
@Controller('teams')
@UseInterceptors(ClassSerializerInterceptor)
export class TeamController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Team created' })
  async create(@Body() dto: CreateTeamDTO): Promise<InternalTeamDTO> {
    try {
      const team = await this.commandBus.execute(
        new CreateTeamCommand(dto.name, dto.ownerId, dto.competitionId)
      );

      return {
        id: team.id.value,
        name: team.name.value,
        ownerId: team.ownerId.value,
        competitionId: team.competitionId.value
      };
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

  @Get(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Team found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<InternalTeamDTO> {
    try {
      return await this.queryBus.execute<GetTeamQuery, InternalTeamDTO>(
        new GetTeamQuery(id)
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

  @Get()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Teams found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const teams = await this.queryBus.execute<
        GetTeamsQuery,
        InternalTeamDTO[]
      >(new GetTeamsQuery());

      res.setHeader('X-Total-Count', teams.length);

      return teams;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get('/competition/:id')
  @ApiResponse({ status: 200, description: 'Teams found' })
  async findByCompetition(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const teams = await this.queryBus.execute<
        GetTeamsByCompetitionQuery,
        TeamDTO[]
      >(new GetTeamsByCompetitionQuery(id));

      res.setHeader('X-Total-Count', teams.length);

      return teams;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
