import { DriverNotFound } from '../exception';
import { DriverId } from '../model';
import { DriverRepository } from '../repository';

export class DriverFinder {
  constructor(private readonly repository: DriverRepository) {}

  public async findOrThrow(id: DriverId) {
    const driver = await this.repository.find(id);

    if (!driver) {
      throw DriverNotFound.with(id);
    }

    return driver;
  }
}
