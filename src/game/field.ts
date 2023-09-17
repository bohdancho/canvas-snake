import { COLORS, FIELD_LENGTH } from '../config'
import { Canvas } from './canvas'
import { Direction } from './direction'
import { Entity } from './entity'
import { Square } from './square'
import { Vector } from './vector'

export class Field {
  public readonly fieldSize: Vector = new Vector(FIELD_LENGTH, FIELD_LENGTH)
  private readonly squares: Square[][]
  private readonly squareLengthPx: number

  constructor(private readonly canvas: Canvas) {
    const squareLengthPx = Field.getSquareLengthPx(canvas)

    this.squareLengthPx = squareLengthPx
    this.squares = Field.getInitSquares(canvas, this.fieldSize, squareLengthPx)
  }

  public initRender() {
    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )

    this.canvas.ctx.strokeStyle = COLORS.grid
    this.canvas.ctx.strokeRect(
      0,
      0,
      FIELD_LENGTH * this.squareLengthPx,
      FIELD_LENGTH * this.squareLengthPx,
    )
  }

  public updateSquare(position: Vector, entity: Entity | null) {
    const square = this.getSquare(position)
    square.update(entity)
  }

  public renderSquare(position: Vector) {
    const square = this.getSquare(position)
    square.render()
  }

  public getRandomFreePosition(): Vector {
    const position = Vector.random(this.fieldSize)
    const conflict = this.getSquare(position).entity
    return conflict ? this.getRandomFreePosition() : position
  }

  public getSquare(position: Vector) {
    return this.squares[position.y][position.x]
  }

  private static getSquareLengthPx(canvas: Canvas) {
    return Math.floor(canvas.sizePx / FIELD_LENGTH)
  }

  private static getInitSquares(
    canvas: Canvas,
    fieldSize: Vector,
    squareLengthPx: number,
  ) {
    const squares: Square[][] = []
    for (let y = 0; y < fieldSize.y; y++) {
      squares[y] = []
      for (let x = 0; x < fieldSize.x; x++) {
        squares[y][x] = new Square(canvas, squareLengthPx, new Vector(x, y))
      }
    }
    return squares
  }

  public static getConnectedSquare(direction: Direction, prev: Vector): Vector {
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

  public static getLastSquare(entity: Vector[]): Vector {
    const last = entity.at(-1)
    if (!last) throw Error('Entity render error')
    return last
  }
}
