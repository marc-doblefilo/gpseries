import { Points } from './points';

describe('Points', () => {
  it('should return points with minimum value (0)', () => {
    const points = Points.fromNumber(0);

    expect(points.equals(points)).toBeTruthy();
  });

  it('should return 20 points', () => {
    const points = Points.fromNumber(20);

    expect(points.equals(points)).toBeTruthy();
  });

  it('should throw if it less than minimum points', () => {
    expect(() => {
      Points.fromNumber(-5);
    }).toThrow();
  });
});
