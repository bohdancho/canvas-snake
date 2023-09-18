import { Canvas, Color } from '~/game/core'
import { Vector } from '~/game/units'

export class FieldSquarePixel {
  private _color?: Color

  constructor(
    private readonly canvas: Canvas,
    private readonly lengthPx: number,
    private readonly location: Vector,
  ) {}

  public set color(color: Color | undefined) {
    if (this._color === color) {
      return
    }
    this._color = color
    if (color) {
      this.paint(color)
    } else {
      this.clear()
    }
  }

  private paint(color: Color): void {
    this.canvas.ctx.fillStyle = color
    this.canvas.ctx.fillRect(
      this.lengthPx * this.location.x,
      this.lengthPx * this.location.y,
      this.lengthPx,
      this.lengthPx,
    )
  }

  private clear(): void {
    this.canvas.ctx.clearRect(
      this.lengthPx * this.location.x,
      this.lengthPx * this.location.y,
      this.lengthPx,
      this.lengthPx,
    )
  }
}
