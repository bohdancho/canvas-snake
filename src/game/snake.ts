import { config } from './config'
import { Direction, isValidDirectionChange, randomDirection } from './direction'
import { Entity } from './entity'
import { Field } from './field'
import { Food } from './food'
import { Vector } from './vector'

export class Snake implements Entity {
  public readonly color = config.colors.snake
  private _direction: Direction
  private requestedDirection?: Direction
  private moveInterval?: ReturnType<typeof setInterval>
  private readonly body: Vector[]
  private readonly initLength = config.snake.initLength
  private readonly moveFrequency = config.snake.moveFrequencyMs

  constructor(private readonly field: Field, private readonly onCollapse: () => void) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(direction, this.initLength, field.length)
    body.forEach((position) => field.updateSquare(position, this))

    this._direction = direction
    this.body = body
  }

  public startMoving(): void {
    this.moveInterval = setInterval(() => this.move(), this.moveFrequency)
  }

  private stopMoving(): void {
    clearInterval(this.moveInterval)
  }

  public move(): void {
    if (this.requestedDirection) {
      this._direction = this.requestedDirection
      this.requestedDirection = undefined
    }

    const move = this.getMove()

    const willEat = this.willEat(move)
    if (this.willCollapse(move)) {
      this.stopMoving()
      this.onCollapse()
      return
    }

    this.grow(move)
    if (!willEat) {
      this.trimTail()
    }
  }

  public get direction(): Direction {
    return this._direction
  }

  public set direction(direction: Direction) {
    if (isValidDirectionChange(this.direction, direction)) {
      this.requestedDirection = direction
    }
  }

  private grow(move: Vector): void {
    this.body.push(move)
    this.field.updateSquare(move, this)
    this.field.renderSquare(move)
  }

  private trimTail(): void {
    const removed = this.body.shift()
    if (!removed) throw Error('Snake move error')
    this.field.updateSquare(removed, null)
    this.field.renderSquare(removed)
  }

  private willCollapse(move: Vector): boolean {
    return this.field.getSquare(move).entity === this
  }

  private willEat(move: Vector): boolean {
    return this.field.getSquare(move).entity instanceof Food
  }

  private getMove(): Vector {
    const last = Field.getLastSquare(this.body)
    const square = Field.getConnectedSquare(this._direction, last)
    const validPosition = { x: square.x, y: square.y }

    const axes = ['x', 'y'] as const
    axes.forEach((axis) => {
      if (square[axis] >= this.field.length) {
        validPosition[axis] = 0
      }
      if (square[axis] < 0) {
        validPosition[axis] = this.field.length - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
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
