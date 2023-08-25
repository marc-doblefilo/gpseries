import * as uuid from 'uuid';

import { RaceId } from '../../../src/race/domain';

describe('Race Id', () => {
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
