import { Name } from '../../../../src/competition/domain';

describe('Competition Name', () => {
  it('should return a name', () => {
    const name = Name.fromString('New Name');

    expect(name).toBeDefined();
    expect(name).toBeInstanceOf(Name);
  });

  it('should throw if it is empty', () => {
    expect(() => {
      Name.fromString('');
    }).toThrow();
  });

  it('should throw if it is longer than 20 characters', () => {
    expect(() => {
      Name.fromString('NewCoolAmazingIncredibleTooLongName');
    }).toThrow();
  });
});
