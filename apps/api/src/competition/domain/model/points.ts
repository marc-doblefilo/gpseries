import { ValueObject } from '@gpseries/domain';

interface Props {
  position: number;
  points: number;
}

export class Points extends ValueObject<Props> {
  public static fromPrimitives(args: {
    position: number;
    points: number;
  }): Points {
    const { points, position } = args;

    return new Points({ position, points });
  }

  get position(): number {
    return this.props.position;
  }

  get points(): number {
    return this.props.points;
  }

  public static default(): Points[] {
    return [
      Points.fromPrimitives({ position: 1, points: 25 }),
      Points.fromPrimitives({ position: 2, points: 18 }),
      Points.fromPrimitives({ position: 3, points: 15 }),
      Points.fromPrimitives({ position: 4, points: 12 }),
      Points.fromPrimitives({ position: 5, points: 10 }),
      Points.fromPrimitives({ position: 6, points: 8 }),
      Points.fromPrimitives({ position: 7, points: 6 }),
      Points.fromPrimitives({ position: 8, points: 4 }),
      Points.fromPrimitives({ position: 9, points: 2 }),
      Points.fromPrimitives({ position: 10, points: 1 })
    ];
  }
}
