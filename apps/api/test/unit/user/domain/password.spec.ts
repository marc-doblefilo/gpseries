import { Password } from '../../../../src/user/domain';

describe('Password', () => {
  it('should be a string', () => {
    expect(Password.fromString('password').value).toBe('password');
  });

  it('should not be empty', () => {
    expect(() => {
      Password.fromString('');
    }).toThrow();
  });
});
