import { ValueObject } from '@gpseries/domain';

interface Props {
  value: string;
}

export class Name extends ValueObject<Props> {
  public static fromString(name: string): Name {
    if (name.length === 0) {
      throw new Error('Competition Name cannot be empty');
    }

    if (name.length > 20) {
      throw new Error('Competition Name cannot be longer than 20 characters');
    }

    return new Name({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
