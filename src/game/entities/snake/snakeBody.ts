import { Field } from '~/game/field'
import { Direction, Vector } from '~/game/units'
import { Snake } from '.'
import { Food } from '..'

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

  public grow(validDirection: Direction): { event: null | 'ateFood' | 'collapsed' } {
    const last = Field.getLastSquare(this.state)
    const location = Field.getConnectedSquare(validDirection, last)
    const transpiledLocation = SnakeBody.transpileLocation(location, this.field.length)

    const replacedEntity = this.field.getSquare(transpiledLocation).entity

    if (replacedEntity === this.snake) {
      return { event: 'collapsed' }
    }
    const event = replacedEntity instanceof Food ? 'ateFood' : null

    this.state.push(transpiledLocation)
    this.field.updateSquare(transpiledLocation, this.snake)
    this.field.renderSquare(transpiledLocation)
    return { event }
  }

  public trimTail(): void {
    const removed = this.state.shift()
    if (!removed) throw Error('Snake move error')
    this.field.updateSquare(removed, null)
    this.field.renderSquare(removed)
  }

  private static transpileLocation(location: Vector, fieldLength: number): Vector {
    const validPosition = { x: location.x, y: location.y }

    const axes = ['x', 'y'] as const
    axes.forEach((axis) => {
      if (location[axis] >= fieldLength) {
        validPosition[axis] = 0
      }
      if (location[axis] < 0) {
        validPosition[axis] = fieldLength - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
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
