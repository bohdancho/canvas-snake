import { SNAKE_INIT_SIZE } from '../config'
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
    const body = Snake.getRandomBody(field.fieldSize, direction)

    this.direction = direction
    this.body = body
  }

  public initRender() {
    this.body.forEach((square) => {
      return this.field.paintSquare(square, 'blue')
    })
  }

  public move() {
    const removed = this.body.shift()
    const last = Snake.getLastSquare(this.body)
    const added = Snake.getConnectedSquare(this.direction, last)
    this.body.push(added)
  }

  private static getRandomBody(fieldSize: Vector, direction: Direction): Vector[] {
    const startX = randomInteger(0, fieldSize.x - 1)
    const startY = randomInteger(0, fieldSize.y - 1)

    const body = [new Vector(startX, startY)]
    for (let i = 1; i < SNAKE_INIT_SIZE; i++) {
      const prev = body.at(-1)
      if (!prev) throw Error('Snake render error')
      body.push(Snake.getConnectedSquare(direction, prev))
    }

    if (!Snake.isBodyValid(fieldSize, body)) {
      return Snake.getRandomBody(fieldSize, direction)
    }
    return body
  }

  private static isBodyValid(fieldSize: Vector, body: Vector[]): boolean {
    const { x, y } = Snake.getLastSquare(body)

    return x >= 0 && y >= 0 && x < fieldSize.x && y < fieldSize.y
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
