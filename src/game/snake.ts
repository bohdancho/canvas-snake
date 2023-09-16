import { randomInteger } from '../utils/randomInteger'
import { Field } from './field'
import { Vector } from './vector'

export class Snake {
  private readonly body: Vector[]

  constructor(private readonly field: Field) {
    this.body = Snake.getRandomBody(field.fieldSize)
  }

  public render() {
    this.body.forEach((square) => {
      return this.field.paintSquare(square, 'blue')
    })
  }

  private static getRandomBody(fieldSize: Vector): Vector[] {
    const startX = randomInteger(0, fieldSize.x - 1)
    const startY = randomInteger(0, fieldSize.y - 1)

    return [new Vector(startX, startY)]
  }
}
