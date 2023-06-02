import { Name } from '../../../../src/driver/domain';

describe('Name', () => {
  it('should not be empty', () => {
    const points = Name.fromString(' ');

    expect(points.equals(points)).toBeTruthy();
  });

  it('should be a string', () => {
    const points = Name.fromString('Marc Rodríguez');

    expect(points.equals(points)).toBeTruthy();
  });
});
