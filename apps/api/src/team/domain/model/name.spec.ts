import { Name } from './name';

describe('Name', () => {
  it('should return the VO', () => {
    const name = Name.fromString('Test');

    expect(name).toBeTruthy();
    expect(name.value).toBe('Test');
  });

  it('should throw if it is null', () => {
    expect(() => {
      Name.fromString('');
    }).toThrow();
  });

  it('should throw if it is longer than 30 characters', () => {
    expect(() => {
      Name.fromString('jjcnjebqjhbchjqbcqhjeqhcbqchqbejc');
    }).toThrow();
  });
});
