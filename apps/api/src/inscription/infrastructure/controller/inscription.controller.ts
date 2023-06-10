import {
  CreateInscriptionDTO,
  InscriptionDTO,
  Role
} from '@gpseries/contracts';
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
import { CreateInscriptionCommand } from '../../application/command/create-inscription.command';

@ApiBearerAuth()
@ApiTags('inscriptions')
@Controller('inscriptions')
@UseInterceptors(ClassSerializerInterceptor)
export class InscriptionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'Inscription created' })
  async create(@Body() dto: CreateInscriptionDTO): Promise<InscriptionDTO> {
    try {
      const inscription = await this.commandBus.execute(
        new CreateInscriptionCommand({
          driverId: dto.driverId,
          raceId: dto.raceId,
          position: dto.position
        })
      );

      return {
        id: inscription.id.value,
        driverId: inscription.driverId.value,
        raceId: inscription.raceId.value,
        position: inscription.position.value
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
}
