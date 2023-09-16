import { Canvas } from './canvas'
import { Vector } from './vector'

export class Square {
  public color = 'blue'

  constructor(
    private readonly canvas: Canvas,
    private readonly size: number,
    private readonly position: Vector,
  ) {}

  public render() {
    this.canvas.ctx.fillStyle = this.color
    this.canvas.ctx.fillRect(
      this.size * this.position.x,
      this.size * this.position.y,
      this.size,
      this.size,
    )
  }
}
