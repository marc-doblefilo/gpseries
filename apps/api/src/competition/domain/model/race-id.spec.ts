import * as uuid from 'uuid';

import { RaceId } from './race-id';

describe('Competition Id', () => {
  it('should return a new id', () => {
    const id = RaceId.generate();

    expect(uuid.validate(id.value)).toBeTruthy();
  });

  it('should throw if it is not an uuid', () => {
    expect(() => {
      RaceId.fromString('');
    }).toThrow();
  });
});
