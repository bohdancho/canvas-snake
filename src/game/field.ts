import { SQUARE_SIZE_PX } from '../config'
import { Canvas } from './canvas'
import { Square } from './square'
import { Vector } from './vector'

export class Field {
  public readonly fieldSize: Vector
  private readonly squares: Square[][]

  constructor(private readonly canvas: Canvas) {
    const fieldSize = Field.getFieldSize(canvas, SQUARE_SIZE_PX)

    this.fieldSize = fieldSize
    this.squares = Field.getInitSquares(fieldSize, canvas, SQUARE_SIZE_PX)
  }

  public render() {
    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render('grey')
      }),
    )

    this.canvas.ctx.strokeRect(
      0,
      0,
      this.fieldSize.x * SQUARE_SIZE_PX,
      this.fieldSize.y * SQUARE_SIZE_PX,
    )
  }

  public paintSquare(position: Vector, color: string) {
    this.squares[position.y][position.x].paint(color)
  }

  private static getFieldSize(canvas: Canvas, squareSize: number): Vector {
    const width = Math.floor(canvas.sizePx.width / squareSize)
    const height = Math.floor(canvas.sizePx.height / squareSize)
    return new Vector(width, height)
  }

  private static getInitSquares(
    fieldSize: Vector,
    canvas: Canvas,
    SQUARE_SIZE_PX: number,
  ) {
    const squares: Square[][] = []
    for (let y = 0; y < fieldSize.y; y++) {
      squares[y] = []
      for (let x = 0; x < fieldSize.x; x++) {
        squares[y][x] = new Square(canvas, SQUARE_SIZE_PX, new Vector(x, y))
      }
    }
    return squares
  }
}
