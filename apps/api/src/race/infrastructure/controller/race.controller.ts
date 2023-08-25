import { CreateRaceDTO, RaceDTO } from '@gpseries/contracts';
import { NotFoundError, Nullable } from '@gpseries/domain';
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRaceCommand } from '../../application/command/create-race.command';
import { GetNextRaceQuery } from '../../application/query/get-next-race.query';

@ApiBearerAuth()
@ApiTags('races')
@Controller('races')
@UseInterceptors(ClassSerializerInterceptor)
export class RaceController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Race created' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async createRace(@Body() dto: CreateRaceDTO): Promise<Nullable<RaceDTO>> {
    try {
      return await this.commandBus.execute(
        new CreateRaceCommand(dto.competitionId, dto.name, dto.date)
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

  @Get('upcoming-race')
  @ApiResponse({ status: 200, description: 'Next race found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async nextRace(
    @Query() query: { competitionId: string }
  ): Promise<Nullable<RaceDTO>> {
    try {
      return await this.queryBus.execute<GetNextRaceQuery, RaceDTO>(
        new GetNextRaceQuery(query.competitionId)
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
