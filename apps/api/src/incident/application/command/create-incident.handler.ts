import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DriverId } from '../../../driver/domain';
import { RaceId } from '../../../race/domain';
import {
  Incident,
  IncidentDescription,
  IncidentId,
  IncidentRepository,
  incidentRepository
} from '../../domain';
import { CreateIncidentCommand } from './create-incident.command';

@CommandHandler(CreateIncidentCommand)
export class CreateIncidentHandler
  implements ICommandHandler<CreateIncidentCommand>
{
  constructor(
    @Inject(incidentRepository) private repository: IncidentRepository
  ) {}

  async execute(command: CreateIncidentCommand): Promise<void> {
    const id = IncidentId.generate();
    const description = IncidentDescription.fromString(command.description);
    const driversId = command.driversId.map(DriverId.fromString);
    const raceId = RaceId.fromString(command.raceId);

    const incident = Incident.add(id, raceId, description, driversId);

    this.repository.create(incident);
  }
}
