import { Canvas } from './canvas'
import { Square } from './square'
import { Vector } from './vector'

export class Field {
  private readonly squares: Array<Array<Square>>
  constructor(private readonly canvas: Canvas, private readonly squareSize: number) {
    this.squares = [[new Square(canvas, squareSize, new Vector(0, 0))]]
  }

  public render() {
    this.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0)

    this.squares.forEach((row) =>
      row.forEach((square) => {
        square.render()
      }),
    )
  }
}
