import { Canvas } from './canvas'
import { Square } from './square'
import { Vector } from './vector'

export class Field {
  private readonly squares: Array<Array<Square>>
  constructor(private readonly canvas: Canvas, squareSizePx: number) {
    const fieldSize = Field.getFieldSize(canvas, squareSizePx)

    this.squares = Field.getSquares(fieldSize, canvas, squareSizePx)
  }
  public render() {
    this.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0)

    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )
  }

  private static getFieldSize(canvas: Canvas, squareSize: number): Vector {
    const width = Math.floor(canvas.sizePx.width / squareSize)
    const height = Math.floor(canvas.sizePx.height / squareSize)
    return new Vector(width, height)
  }

  private static getSquares(fieldSize: Vector, canvas: Canvas, squareSizePx: number) {
    const squares: Array<Array<Square>> = []
    for (let y = 0; y < fieldSize.x; y++) {
      squares[y] = []
      for (let x = 0; x < fieldSize.y; x++) {
        squares[y][x] = new Square(canvas, squareSizePx, new Vector(x, y))
      }
    }
    return squares
  }
}
