import { Name } from '../../../../src/user/domain';

describe('Name', () => {
  it('should be a string', () => {
    const name = Name.fromString('Marc Rodríguez');
    expect(name.value).toBe('Marc Rodríguez');
    expect(name).toBeInstanceOf(Name);
  });

  it('should not be empty', () => {
    expect(() => {
      Name.fromString('');
    }).toThrow();
  });
});
