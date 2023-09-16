import { Color } from '../config'
import { Canvas } from './canvas'
import { Vector } from './vector'

export class Square {
  constructor(
    private readonly canvas: Canvas,
    private readonly size: number,
    private readonly position: Vector,
  ) {}

  public render(color: string) {
    this.canvas.ctx.strokeStyle = color
    this.canvas.ctx.strokeRect(
      this.size * this.position.x,
      this.size * this.position.y,
      this.size,
      this.size,
    )
  }

  public paint(color: Color) {
    this.canvas.ctx.fillStyle = color
    this.canvas.ctx.fillRect(
      this.size * this.position.x,
      this.size * this.position.y,
      this.size,
      this.size,
    )
  }
}
