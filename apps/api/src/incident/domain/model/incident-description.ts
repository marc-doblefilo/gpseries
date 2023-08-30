import { ValueObject } from '@gpseries/domain';

interface Props {
  value: string;
}

export class IncidentDescription extends ValueObject<Props> {
  public static fromString(description: string): IncidentDescription {
    if (description.length === 0) {
      throw new Error('Competition Description cannot be empty');
    }

    if (description.length > 800) {
      throw new Error(
        'Competition Description cannot be longer than 800 characters'
      );
    }

    return new IncidentDescription({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
