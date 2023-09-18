import { Canvas, config } from '~/game/core'
import { Entity } from '~/game/entities'
import { Direction, Vector } from '~/game/units'
import { ReadonlyMatrix } from '~/utils'
import { FieldSquare } from './fieldSquare'

export class Field {
  public readonly length: number = config.field.length
  private readonly squares: ReadonlyMatrix<FieldSquare>

  constructor(private readonly canvas: Canvas) {
    const squareLengthPx = canvas.sizePx / this.length
    this.squares = Field.getInitialSquares(this.canvas, this.length, squareLengthPx)
  }

  public initRender(): void {
    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )
  }

  public updateSquare(location: Vector, entity: Entity | undefined): void {
    const square = this.getSquare(location)
    square.entity = entity
  }

  public renderSquare(location: Vector): void {
    const square = this.getSquare(location)
    square.render()
  }

  public getRandomFreeLocation(): Vector {
    const location = Vector.random(this.length)
    const isFree = this.getSquare(location).entity === undefined
    return isFree ? location : this.getRandomFreeLocation()
  }

  public getSquare(location: Vector): FieldSquare {
    return this.squares[location.y][location.x]
  }

  public isValidLocation(location: Vector): boolean {
    const { x, y } = location

    return x >= 0 && y >= 0 && x < this.length && y < this.length
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

  private static getInitialSquares(
    canvas: Canvas,
    fieldLength: number,
    squareLengthPx: number,
  ): FieldSquare[][] {
    const squares: FieldSquare[][] = []
    for (let y = 0; y < fieldLength; y++) {
      squares[y] = []
      for (let x = 0; x < fieldLength; x++) {
        squares[y][x] = new FieldSquare(
          canvas,
          squareLengthPx,
          new Vector(x, y),
          config.field.resolution, // todo pull resolution to config
        )
      }
    }
    return squares
  }
}
