import { COLORS, Color } from '../config'
import { Canvas } from './canvas'
import { Vector } from './vector'

export class Square {
  constructor(
    private readonly canvas: Canvas,
    private readonly size: number,
    private readonly position: Vector,
  ) {}

  private paintBorder() {
    this.canvas.ctx.strokeStyle = COLORS.grid
    this.canvas.ctx.strokeRect(
      this.size * this.position.x,
      this.size * this.position.y,
      this.size,
      this.size,
    )
  }

  public initRender() {
    this.paintBorder()
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

  public clear() {
    this.canvas.ctx.clearRect(
      this.size * this.position.x,
      this.size * this.position.y,
      this.size,
      this.size,
    )
    this.paintBorder()
  }
}
