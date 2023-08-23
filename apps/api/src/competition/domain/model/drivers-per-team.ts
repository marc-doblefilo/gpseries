import { ValueObject } from '@gpseries/domain';

interface Props {
  value: number;
}

export class DriversPerTeam extends ValueObject<Props> {
  public static fromPrimitive(position: number): DriversPerTeam {
    DriversPerTeam.verifyIsPositive(position);

    return new DriversPerTeam({ value: position });
  }

  private static verifyIsPositive(position: number): void {
    if (position <= 0) {
      throw new Error(`The number of drivers per team cannot be 0 or less`);
    }
  }

  get value(): number {
    return this.props.value;
  }
}
