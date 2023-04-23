import * as uuid from 'uuid';

import { DriverId } from './driver-id';

describe('Driver Id', () => {
  it('should return a new id', () => {
    const id = DriverId.generate();

    expect(uuid.validate(id.value)).toBeTruthy();
  });

  it('should throw if it is not an uuid', () => {
    expect(() => {
      DriverId.fromString('');
    }).toThrow();
  });
});
