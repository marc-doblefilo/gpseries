import { ValueObject } from '@gpseries/domain';

interface Props {
  value: number;
}

export class Position extends ValueObject<Props> {
  public static fromPrimitive(position: number): Position {
    Position.verifyIsPositive(position);

    return new Position({ value: position });
  }

  private static verifyIsPositive(position: number): void {
    if (position <= 0) {
      throw new Error(`Driver's position cannot be 0 or less`);
    }
  }

  get value(): number {
    return this.props.value;
  }
}
