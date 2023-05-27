import { CreateTeamDTO, Role, TeamDTO } from '@gpseries/contracts';
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
import { CreateTeamCommand } from '../../application/command/create-team.command';

@ApiBearerAuth()
@ApiTags('teams')
@Controller('teams')
@UseInterceptors(ClassSerializerInterceptor)
export class TeamController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'Team created' })
  async create(@Body() dto: CreateTeamDTO): Promise<TeamDTO> {
    try {
      return await this.commandBus.execute(
        new CreateTeamCommand(dto.name, dto.ownerId, dto.competitionId)
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
