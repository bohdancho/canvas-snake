import { COLORS, SNAKE_INIT_SIZE } from '../config'
import { randomInteger } from '../utils/randomInteger'
import { Direction, randomDirection } from './direction'
import { Entity } from './entity'
import { Field } from './field'
import { Food } from './food'
import { Vector } from './vector'

export class SnakeCollapcedException extends Error {
  constructor() {
    super('Snake collapsed')
    this.name = 'SnakeCollapcedException'
    Object.setPrototypeOf(this, SnakeCollapcedException.prototype)
  }
}

export class Snake implements Entity {
  public readonly color = COLORS.snake
  public direction: Direction
  private body: Vector[]

  constructor(private readonly field: Field) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(field.fieldSize, direction)
    body.forEach((position) => field.updateSquare(position, this))

    this.direction = direction
    this.body = body
  }

  public initRender() {
    this.body.forEach((square) => {
      return this.field.updateSquare(square, this)
    })
  }

  public move() {
    const last = Field.getLastSquare(this.body)
    const move = Snake.getMoveSquare(this.direction, last, this.field.fieldSize)

    const willEat = this.willEat(move)
    if (this.willCollapse(move)) {
      throw new SnakeCollapcedException()
    }

    this.body.push(move)
    this.field.updateSquare(move, this)
    this.field.renderSquare(move)

    if (willEat) {
      return
    }
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

  private static getMoveSquare(
    direction: Direction,
    prev: Vector,
    fieldSize: Vector,
  ): Vector {
    const square = Field.getConnectedSquare(direction, prev)
    const validPosition = { x: square.x, y: square.y }

    const axes = ['x', 'y'] as const
    axes.forEach((axis) => {
      if (square[axis] >= fieldSize[axis]) {
        validPosition[axis] = 0
      }
      if (square[axis] < 0) {
        validPosition[axis] = fieldSize[axis] - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
  }
}
