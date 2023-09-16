import { Canvas } from './canvas'
import { Size } from './size'

export class Field {
  constructor(private readonly canvas: Canvas, private readonly tileSize: Size) {}

  public drawField() {
    this.canvas.ctx.fillStyle = 'green'
    this.canvas.ctx.fillRect(0, 0, this.canvas.size.width, this.canvas.size.height)
  }
}
