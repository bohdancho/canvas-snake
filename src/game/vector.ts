import { randomInteger } from '../utils/randomInteger'

export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public static areEqual(a: Vector, b: Vector) {
    return a.x === b.x && a.y === b.y
  }

  public static random(fieldSize: Vector): Vector {
    const x = randomInteger(0, fieldSize.x - 1)
    const y = randomInteger(0, fieldSize.y - 1)
    return new Vector(x, y)
  }
}
