import { COLORS, SNAKE_INIT_SIZE, SNAKE_MOVE_FREQUENCY } from '../config'
import { randomInteger } from '../utils/randomInteger'
import { Direction, randomDirection } from './direction'
import { Entity } from './entity'
import { Field } from './field'
import { Food } from './food'
import { Vector } from './vector'

export class Snake implements Entity {
  public readonly color = COLORS.snake
  private _direction: Direction
  private newDirection?: Direction
  private body: Vector[]
  private moveInterval?: ReturnType<typeof setInterval>

  constructor(private readonly field: Field, private readonly onCollapse: () => void) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(field.fieldSize, direction)
    body.forEach((position) => field.updateSquare(position, this))

    this._direction = direction
    this.body = body
  }

  public startSnake() {
    this.moveInterval = setInterval(() => this.move(), SNAKE_MOVE_FREQUENCY)
  }

  private stopSnake() {
    clearInterval(this.moveInterval)
  }

  public move(): void {
    if (this.newDirection) {
      this._direction = this.newDirection
      this.newDirection = undefined
    }

    const move = this.getMove()

    const willEat = this.willEat(move)
    if (this.willCollapse(move)) {
      this.stopSnake()
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
    this.newDirection = direction
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
      if (square[axis] >= this.field.fieldSize[axis]) {
        validPosition[axis] = 0
      }
      if (square[axis] < 0) {
        validPosition[axis] = this.field.fieldSize[axis] - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
  }

  private static getInitialBody(fieldSize: Vector, direction: Direction): Vector[] {
    const startX = randomInteger(0, fieldSize.x - 1)
    const startY = randomInteger(0, fieldSize.y - 1)

    const body = [new Vector(startX, startY)]
    for (let i = 1; i < SNAKE_INIT_SIZE; i++) {
      const prev = Field.getLastSquare(body)
      body.push(Field.getConnectedSquare(direction, prev))
    }

    if (!Snake.isBodyValid(fieldSize, body)) {
      return Snake.getInitialBody(fieldSize, direction)
    }
    return body
  }

  private static isBodyValid(fieldSize: Vector, body: Vector[]): boolean {
    const { x, y } = Field.getLastSquare(body)

    return x >= 0 && y >= 0 && x < fieldSize.x && y < fieldSize.y
  }
}
