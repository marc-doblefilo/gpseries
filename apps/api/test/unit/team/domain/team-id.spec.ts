import * as uuid from 'uuid';

import { TeamId } from '../../../../src/team/domain';

describe('Team Id', () => {
  it('should return a new id', () => {
    const id = TeamId.generate();

    expect(uuid.validate(id.value)).toBeTruthy();
  });

  it('should throw if it is not an uuid', () => {
    expect(() => {
      TeamId.fromString('');
    }).toThrow();
  });
});
