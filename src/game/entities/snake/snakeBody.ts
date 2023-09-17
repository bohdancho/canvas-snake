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
    this.state = SnakeBody.getInitialState(this.field, initDirection, initLength)
    this.state.forEach((position) => this.field.updateSquare(position, snake))
  }

  public grow(validDirection: Direction): { event: null | 'ateFood' | 'collapsed' } {
    const last = SnakeBody.getHead(this.state)
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

  private static getInitialState(field: Field, direction: Direction, length: number): Vector[] {
    const start = Vector.random(field.length)

    const body = [start]
    for (let i = 1; i < length; i++) {
      const prev = SnakeBody.getHead(body)
      body.push(Field.getConnectedSquare(direction, prev))
    }

    if (!field.isValidLocation(SnakeBody.getHead(body))) {
      return SnakeBody.getInitialState(field, direction, length)
    }
    return body
  }

  private static getHead(body: Vector[]): Vector {
    const head = body.at(-1)
    if (!head) throw Error('No snake head')
    return head
  }
}
