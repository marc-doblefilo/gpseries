import * as uuid from 'uuid';

import { CompetitionId } from '../../../../src/competition/domain';

describe('Competition Id', () => {
  it('should return a new id', () => {
    const id = CompetitionId.generate();

    expect(uuid.validate(id.value)).toBeTruthy();
  });

  it('should throw if it is not an uuid', () => {
    expect(() => {
      CompetitionId.fromString('');
    }).toThrow();
  });
});
