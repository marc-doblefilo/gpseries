import { CompetitionDescription } from '../../../../src/competition/domain';

describe('Competition Description', () => {
  it('should return a description', () => {
    const name = CompetitionDescription.fromString('New Name');

    expect(name).toBeDefined();
    expect(name).toBeInstanceOf(CompetitionDescription);
  });

  it('should throw if it is empty', () => {
    expect(() => {
      CompetitionDescription.fromString('');
    }).toThrow();
  });

  it('should throw if it is longer than 200 characters', () => {
    let description = '';
    for (let i = 0; i < 201; i++) {
      description += 'a';
    }

    expect(() => {
      CompetitionDescription.fromString(description);
    }).toThrow();
  });
});
