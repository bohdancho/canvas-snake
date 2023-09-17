import { randomInteger } from '../utils/randomInteger'
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
  private body: Vector[]
  private moveInterval?: ReturnType<typeof setInterval>
  private static readonly INIT_LENGTH = config.snake.initLength
  private static readonly MOVE_FREQUENCY = config.snake.moveFrequencyMs

  constructor(private readonly field: Field, private readonly onCollapse: () => void) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(Field.LENGTH, direction)
    body.forEach((position) => field.updateSquare(position, this))

    this._direction = direction
    this.body = body
  }

  public startMoving() {
    this.moveInterval = setInterval(() => this.move(), Snake.MOVE_FREQUENCY)
  }

  private stopMoving() {
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

  public get direction() {
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
      if (square[axis] >= Field.LENGTH) {
        validPosition[axis] = 0
      }
      if (square[axis] < 0) {
        validPosition[axis] = Field.LENGTH - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
  }

  private static getInitialBody(fieldLength: number, direction: Direction): Vector[] {
    const startX = randomInteger(0, fieldLength - 1)
    const startY = randomInteger(0, fieldLength - 1)

    const body = [new Vector(startX, startY)]
    for (let i = 1; i < Snake.INIT_LENGTH; i++) {
      const prev = Field.getLastSquare(body)
      body.push(Field.getConnectedSquare(direction, prev))
    }

    if (!Snake.isBodyValid(fieldLength, body)) {
      return Snake.getInitialBody(fieldLength, direction)
    }
    return body
  }

  private static isBodyValid(fieldLength: number, body: Vector[]): boolean {
    const { x, y } = Field.getLastSquare(body)

    return x >= 0 && y >= 0 && x < fieldLength && y < fieldLength
  }
}
