import { COLORS, SNAKE_INIT_SIZE } from '../config'
import { Direction } from '../enums/direction.enum'
import { randomDirection } from '../utils/randomDirection'
import { randomInteger } from '../utils/randomInteger'
import { Field } from './field'
import { Vector } from './vector'

export class Snake {
  private direction: Direction
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
    const last = Snake.getLastSquare(this.body)
    const added = Snake.getMoveSquare(this.direction, last, this.field.fieldSize)
    this.body.push(added)

    this.field.clearSquare(removed)
    this.field.paintSquare(added, COLORS.snake)
  }

  private static getInitialBody(fieldSize: Vector, direction: Direction): Vector[] {
    const startX = randomInteger(0, fieldSize.x - 1)
    const startY = randomInteger(0, fieldSize.y - 1)

    const body = [new Vector(startX, startY)]
    for (let i = 1; i < SNAKE_INIT_SIZE; i++) {
      const prev = body.at(-1)
      if (!prev) throw Error('Snake render error')
      body.push(Snake.getConnectedSquare(direction, prev))
    }

    if (!Snake.isBodyValid(fieldSize, body)) {
      return Snake.getInitialBody(fieldSize, direction)
    }
    return body
  }

  private static isBodyValid(fieldSize: Vector, body: Vector[]): boolean {
    const { x, y } = Snake.getLastSquare(body)

    return x >= 0 && y >= 0 && x < fieldSize.x && y < fieldSize.y
  }

  private static getMoveSquare(
    direction: Direction,
    prev: Vector,
    fieldSize: Vector,
  ): Vector {
    const square = this.getConnectedSquare(direction, prev)
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

  private static getConnectedSquare(direction: Direction, prev: Vector): Vector {
    let { x, y } = prev
    switch (direction) {
      case Direction.x_pos:
        x++
        break
      case Direction.x_neg:
        x--
        break
      case Direction.y_pos:
        y++
        break
      case Direction.y_neg:
        y--
        break
    }

    return new Vector(x, y)
  }

  private static getLastSquare(body: Vector[]): Vector {
    const last = body.at(-1)
    if (!last) throw Error('Snake render error')
    return last
  }
}
