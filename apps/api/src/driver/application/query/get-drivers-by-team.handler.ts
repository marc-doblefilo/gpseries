import { DriverDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TeamId } from '../../../team/domain';
import { DriverRepository, driverRepository } from '../../domain';
import { GetDriversByTeamQuery } from './get-drivers-by-team.query';

@QueryHandler(GetDriversByTeamQuery)
export class GetDriversByTeamHandler
  implements IQueryHandler<GetDriversByTeamQuery>
{
  constructor(@Inject(driverRepository) private repository: DriverRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetDriversByTeamQuery): Promise<DriverDTO[]> {
    const id = TeamId.fromString(query.teamId);

    const teamDrivers = await this.repository.findAllByTeam(id);

    return teamDrivers.map(
      driver =>
        ({
          id: driver.id.value,
          name: driver.name.value,
          teamId: driver.teamId.value
        } as DriverDTO)
    );
  }
}
