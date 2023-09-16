import { Canvas } from './canvas'

export class Field {
  constructor(private readonly canvas: Canvas) {}

  public drawField() {
    this.canvas.ctx.fillStyle = 'green'
    this.canvas.ctx.fillRect(0, 0, this.canvas.size.width, this.canvas.size.height)
  }
}
