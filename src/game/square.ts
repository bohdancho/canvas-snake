import { COLORS, Color } from '../config'
import { Canvas } from './canvas'
import { Entity } from './entity'
import { Vector } from './vector'

export class Square {
  private _entity: Entity | null = null

  constructor(
    private readonly canvas: Canvas,
    private readonly sizePx: number,
    private readonly position: Vector,
  ) {}

  public update(entity: Entity | null) {
    this._entity = entity
  }

  public render() {
    if (this._entity) {
      this.paint(this._entity.color)
    } else {
      this.clear()
    }
  }

  public get entity() {
    return this._entity
  }

  private paint(color: Color) {
    this.canvas.ctx.fillStyle = color
    this.canvas.ctx.fillRect(
      this.sizePx * this.position.x,
      this.sizePx * this.position.y,
      this.sizePx,
      this.sizePx,
    )
  }

  private clear() {
    this.canvas.ctx.clearRect(
      this.sizePx * this.position.x,
      this.sizePx * this.position.y,
      this.sizePx,
      this.sizePx,
    )
    this.paintBorder()
  }

  private paintBorder() {
    this.canvas.ctx.strokeStyle = COLORS.grid
    this.canvas.ctx.strokeRect(
      this.sizePx * this.position.x,
      this.sizePx * this.position.y,
      this.sizePx,
      this.sizePx,
    )
  }
}
