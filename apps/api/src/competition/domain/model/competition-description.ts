import { ValueObject } from '@gpseries/domain';

interface Props {
  value: string;
}

export class CompetitionDescription extends ValueObject<Props> {
  public static fromString(description: string): CompetitionDescription {
    if (description.length === 0) {
      throw new Error('Competition Description cannot be empty');
    }

    if (description.length > 200) {
      throw new Error(
        'Competition Description cannot be longer than 20 characters'
      );
    }

    return new CompetitionDescription({ value: description });
  }
}
