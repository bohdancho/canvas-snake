import { Canvas } from '../canvas'
import { Color, config } from '../config'
import { Entity } from '../entities/entity'
import { Direction } from '../units/direction'
import { Vector } from '../units/vector'
import { Square } from './square'

export class Field {
  public readonly length: number = config.field.length
  private readonly gridColor = config.colors.grid
  private readonly squares: Square[][]
  private readonly squareLengthPx: number

  constructor(private readonly canvas: Canvas) {
    const squareLengthPx = Field.getSquareLengthPx(canvas, this.length)

    this.squareLengthPx = squareLengthPx
    this.squares = Field.getInitialSquares(canvas, this.length, squareLengthPx, this.gridColor)
  }

  public initRender(): void {
    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )

    this.paintInitBorder()
  }

  public updateSquare(position: Vector, entity: Entity | null): void {
    const square = this.getSquare(position)
    square.entity = entity
  }

  public renderSquare(position: Vector): void {
    const square = this.getSquare(position)
    square.render()
  }

  public getRandomFreePosition(): Vector {
    const position = Vector.random(this.length)
    const isFree = this.getSquare(position).entity === null
    return isFree ? position : this.getRandomFreePosition()
  }

  public getSquare(position: Vector): Square {
    return this.squares[position.y][position.x]
  }

  private paintInitBorder(): void {
    this.canvas.ctx.strokeStyle = this.gridColor
    this.canvas.ctx.strokeRect(
      0,
      0,
      this.length * this.squareLengthPx,
      this.length * this.squareLengthPx,
    )
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

  public static getLastSquare(squares: Vector[]): Vector {
    const last = squares.at(-1)
    if (!last) throw Error('getLastSquare error')
    return last
  }

  public static isValidSquare(square: Vector, fieldLength: number): boolean {
    const { x, y } = square

    return x >= 0 && y >= 0 && x < fieldLength && y < fieldLength
  }

  private static getSquareLengthPx(canvas: Canvas, fieldLength: number): number {
    return Math.floor(canvas.sizePx / fieldLength)
  }

  private static getInitialSquares(
    canvas: Canvas,
    fieldLength: number,
    squareLengthPx: number,
    gridColor: Color,
  ): Square[][] {
    const squares: Square[][] = []
    for (let y = 0; y < fieldLength; y++) {
      squares[y] = []
      for (let x = 0; x < fieldLength; x++) {
        squares[y][x] = new Square(canvas, squareLengthPx, new Vector(x, y), gridColor)
      }
    }
    return squares
  }
}
