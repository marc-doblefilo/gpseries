import {
  AddResultDTO,
  CreateInscriptionDTO,
  GetInscriptionDTO,
  InscriptionDTO,
  Role
} from '@gpseries/contracts';
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
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { Roles } from '../../../auth/security/roles.decorator';
import { AddResultsCommand } from '../../application/command/add-results.command';
import { CreateInscriptionCommand } from '../../application/command/create-inscription.command';
import { GetInscriptionQuery } from '../../application/query/get-inscription.query';
import { GetInscriptionsByRaceQuery } from '../../application/query/get-inscriptions-by-race.query';
import {
  GetInscriptionsByRaceSwaggerDTO,
  GetInscriptionSwaggerDTO
} from './swagger.dto';

@ApiBearerAuth()
@ApiTags('inscriptions')
@Controller('inscriptions')
@UseInterceptors(ClassSerializerInterceptor)
export class InscriptionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Inscription created' })
  async create(@Body() dto: CreateInscriptionDTO): Promise<InscriptionDTO> {
    try {
      const inscription = await this.commandBus.execute(
        new CreateInscriptionCommand({
          driverId: dto.driverId,
          raceId: dto.raceId
        })
      );

      return {
        id: inscription.id.value,
        driverId: inscription.driverId.value,
        raceId: inscription.raceId.value
      } as InscriptionDTO;
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
  @ApiQuery({ type: GetInscriptionSwaggerDTO })
  @ApiResponse({ status: 200, description: 'Inscription found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getInscription(
    @Query() query: GetInscriptionDTO
  ): Promise<InscriptionDTO> {
    try {
      return this.queryBus.execute(
        new GetInscriptionQuery(query.driverId, query.raceId)
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

  @Get('/by-race')
  @ApiQuery({ type: GetInscriptionsByRaceSwaggerDTO })
  @ApiResponse({ status: 200, description: 'Inscriptions found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getInscriptionsByRace(
    @Query() query: { raceId: string }
  ): Promise<InscriptionDTO[]> {
    try {
      return this.queryBus.execute(
        new GetInscriptionsByRaceQuery(query.raceId)
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

  @Post('/add-results')
  @ApiResponse({ status: 201, description: 'Results were added' })
  async addResults(@Body() dto: AddResultDTO[]): Promise<void> {
    try {
      return this.commandBus.execute(new AddResultsCommand(dto));
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
