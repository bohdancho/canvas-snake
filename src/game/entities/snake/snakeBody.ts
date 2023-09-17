import { Field } from '~/game/field'
import { Direction, Vector } from '~/game/units'
import { Snake } from '.'

export class SnakeBody {
  public readonly state: Vector[]

  constructor(
    private readonly snake: Snake,
    private readonly field: Field,
    initLength: number,
    initDirection: Direction,
  ) {
    this.state = SnakeBody.getInitialState(initDirection, initLength, field.length)
    this.state.forEach((position) => field.updateSquare(position, snake))
  }

  public grow(location: Vector): void {
    this.state.push(location)
    this.field.updateSquare(location, this.snake)
    this.field.renderSquare(location)
  }

  public trimTail(): void {
    const removed = this.state.shift()
    if (!removed) throw Error('Snake move error')
    this.field.updateSquare(removed, null)
    this.field.renderSquare(removed)
  }

  private static getInitialState(
    direction: Direction,
    length: number,
    fieldLength: number,
  ): Vector[] {
    const start = Vector.random(fieldLength)

    const body = [start]
    for (let i = 1; i < length; i++) {
      const prev = Field.getLastSquare(body)
      body.push(Field.getConnectedSquare(direction, prev))
    }

    if (!Field.isValidSquare(Field.getLastSquare(body), fieldLength)) {
      return SnakeBody.getInitialState(direction, length, fieldLength)
    }
    return body
  }
}
