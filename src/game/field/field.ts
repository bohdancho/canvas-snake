import { Canvas, Color, config } from '~/game/core'
import { Entity } from '~/game/entities'
import { Direction, Vector } from '~/game/units'
import { Square } from '.'

export class Field {
  public readonly length: number = config.field.length
  private readonly gridColor = config.colors.grid
  private readonly squares: Square[][]
  private readonly squareLengthPx: number

  constructor(private readonly canvas: Canvas) {
    const squareLengthPx = Field.getSquareLengthPx(this.canvas, this.length)

    this.squareLengthPx = squareLengthPx
    this.squares = Field.getInitialSquares(this.canvas, this.length, squareLengthPx, this.gridColor)
  }

  public initRender(): void {
    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )

    this.paintInitBorder()
  }

  public updateSquare(location: Vector, entity: Entity | null): void {
    const square = this.getSquare(location)
    square.entity = entity
  }

  public renderSquare(location: Vector): void {
    const square = this.getSquare(location)
    square.render()
  }

  public getRandomFreeLocation(): Vector {
    const location = Vector.random(this.length)
    const isFree = this.getSquare(location).entity === null
    return isFree ? location : this.getRandomFreeLocation()
  }

  public getSquare(location: Vector): Square {
    return this.squares[location.y][location.x]
  }

  public isValidLocation(location: Vector): boolean {
    const { x, y } = location

    return x >= 0 && y >= 0 && x < this.length && y < this.length
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

  public static getConnectedLocation(direction: Direction, prev: Vector): Vector {
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
