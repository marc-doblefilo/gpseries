import {
  CompetitionDTO,
  CreateCompetitionDTO,
  Role
} from '@gpseries/contracts';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/security/roles.decorator';

@ApiBearerAuth()
@ApiTags('competitions')
@Controller('competitions')
@UseInterceptors(ClassSerializerInterceptor)
export class CompetitionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Competition created' })
  async create(
    @Body() createCompetitionDto: CreateCompetitionDTO
  ): Promise<CompetitionDTO> {
    try {
      return {
        id: '',
        ownerId: '',
        name: '',
        description: '',
        races: []
      };
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
