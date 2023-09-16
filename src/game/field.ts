import { Canvas } from './canvas'
import { Square } from './square'
import { Vector } from './vector'

export class Field {
  public readonly fieldSize: Vector
  private readonly squares: Square[][]

  constructor(private readonly canvas: Canvas, private readonly squareSizePx: number) {
    const fieldSize = Field.getFieldSize(canvas, squareSizePx)

    this.fieldSize = fieldSize
    this.squares = Field.getInitSquares(fieldSize, canvas, squareSizePx)
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
      this.fieldSize.x * this.squareSizePx,
      this.fieldSize.y * this.squareSizePx,
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

  private static getInitSquares(fieldSize: Vector, canvas: Canvas, squareSizePx: number) {
    const squares: Square[][] = []
    for (let y = 0; y < fieldSize.y; y++) {
      squares[y] = []
      for (let x = 0; x < fieldSize.x; x++) {
        squares[y][x] = new Square(canvas, squareSizePx, new Vector(x, y))
      }
    }
    return squares
  }
}
