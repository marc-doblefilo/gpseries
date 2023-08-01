import { DriverDTO } from '@gpseries/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  DriverFinder,
  DriverId,
  DriverRepository,
  driverRepository
} from '../../domain';
import { GetDriverQuery } from './get-driver.query';

@QueryHandler(GetDriverQuery)
export class GetDriverHandler implements IQueryHandler<GetDriverQuery> {
  private readonly driverFinder: DriverFinder;

  constructor(@Inject(driverRepository) private repository: DriverRepository) {
    this.driverFinder = new DriverFinder(repository);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetDriverQuery): Promise<DriverDTO> {
    const id = DriverId.fromString(query.driverId);

    const driver = await this.driverFinder.findOrThrow(id);

    return {
      id: driver.id.value,
      name: driver.name.value,
      teamId: driver.teamId.value
    };
  }
}
