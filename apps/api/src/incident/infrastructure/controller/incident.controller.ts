import { CreateIncidentDTO, InscriptionDTO } from '@gpseries/contracts';
import { NotFoundError } from '@gpseries/domain';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetInscriptionsByRaceQuery } from '../../../inscription/application/query/get-inscriptions-by-race.query';
import { GetInscriptionsByRaceSwaggerDTO } from '../../../inscription/infrastructure/controller/swagger.dto';
import { CreateIncidentCommand } from '../../application/command/create-incident.command';
import { GetIncidentsByCompetitionQuery } from '../../application/query/get-incidents-by-competition.query';

@ApiBearerAuth()
@ApiTags('incidents')
@Controller('incidents')
@UseInterceptors(ClassSerializerInterceptor)
export class IncidentController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Incident created' })
  async create(@Body() dto: CreateIncidentDTO) {
    try {
      await this.commandBus.execute(
        new CreateIncidentCommand(dto.description, dto.driversId, dto.raceId)
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

  @Get('/by-competition')
  @ApiResponse({ status: 200, description: 'Incidents found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getInscriptionsByRace(
    @Query() query: { competitionId: string }
  ): Promise<InscriptionDTO[]> {
    try {
      return this.queryBus.execute(
        new GetIncidentsByCompetitionQuery(query.competitionId)
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
