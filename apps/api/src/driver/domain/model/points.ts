import { ValueObject } from '@gpseries/domain';

interface Props {
  value: number;
}

export class Points extends ValueObject<Props> {
  public static fromNumber(points: number): Points {
    if (points < 0) {
      throw new Error('Driver points cannot be less than 0');
    }

    return new Points({ value: points });
  }

  get value() {
    return this.props.value;
  }
}
