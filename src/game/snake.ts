import { COLORS, SNAKE_INIT_SIZE } from '../config'
import { randomInteger } from '../utils/randomInteger'
import { Direction, randomDirection } from './direction'
import { Field } from './field'
import { Vector } from './vector'

export class SnakeCollapcedException extends Error {
  constructor() {
    super('Snake collapsed')
    this.name = 'SnakeCollapcedException'
    Object.setPrototypeOf(this, SnakeCollapcedException.prototype)
  }
}

export class Snake {
  public direction: Direction
  private body: Vector[]

  constructor(private readonly field: Field) {
    const direction = randomDirection()
    const body = Snake.getInitialBody(field.fieldSize, direction)

    this.direction = direction
    this.body = body
  }

  public initRender() {
    this.body.forEach((square) => {
      return this.field.paintSquare(square, COLORS.snake)
    })
  }

  public move() {
    const removed = this.body.shift()
    if (!removed) throw Error('Snake move error')
    const last = Field.getLastSquare(this.body)

    const added = Snake.getMoveSquare(this.direction, last, this.field.fieldSize)

    if (Snake.hasCollapsed(this.body, added)) {
      throw new SnakeCollapcedException()
    }
    this.body.push(added)

    this.field.clearSquare(removed)
    this.field.paintSquare(added, COLORS.snake)
  }

  private static hasCollapsed(body: Vector[], move: Vector): boolean {
    return body.some((square) => Vector.areEqual(square, move))
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
