import { DriverDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DriverRepository, driverRepository } from '../../domain';
import { GetDriversQuery } from './get-drivers.query';

@QueryHandler(GetDriversQuery)
export class GetDriversHandler implements IQueryHandler<GetDriversQuery> {
  constructor(@Inject(driverRepository) private repository: DriverRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetDriversQuery): Promise<Array<DriverDTO>> {
    const drivers = await this.repository.findAll();

    return drivers.map(driver => ({
      id: driver.id.value,
      name: driver.name.value,
      teamId: driver.teamId.value
    }));
  }
}
