import { config } from '~/game/core'
import { Field } from '~/game/field'
import { Direction, Vector, randomDirection } from '~/game/units'
import { Entity, SnakeMover } from '..'

export class Snake implements Entity {
  public readonly color = config.colors.snake
  private readonly body: Vector[]
  private readonly initLength = config.snake.initLength
  private readonly mover: SnakeMover

  constructor(private readonly field: Field, private readonly onCollapse: () => void) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(direction, this.initLength, field.length)
    body.forEach((position) => field.updateSquare(position, this))

    this.body = body
    this.mover = new SnakeMover(
      this.field,
      body,
      this.grow.bind(this),
      this.trimTail.bind(this),
      this.onCollapse,
      direction,
    )
  }

  public startMoving(): void {
    this.mover.startMoving()
  }

  public get direction(): Direction {
    return this.mover.direction
  }

  public set direction(direction: Direction) {
    this.mover.direction = direction
  }

  private grow(location: Vector): void {
    this.body.push(location)
    this.field.updateSquare(location, this)
    this.field.renderSquare(location)
  }

  private trimTail(): void {
    const removed = this.body.shift()
    if (!removed) throw Error('Snake move error')
    this.field.updateSquare(removed, null)
    this.field.renderSquare(removed)
  }

  private static getInitialBody(
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
      return Snake.getInitialBody(direction, length, fieldLength)
    }
    return body
  }
}
