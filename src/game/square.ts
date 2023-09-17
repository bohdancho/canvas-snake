import { Color } from '../config'
import { Canvas } from './canvas'
import { Entity } from './entity'
import { Vector } from './vector'

export class Square {
  private _entity: Entity | null = null

  constructor(
    private readonly canvas: Canvas,
    private readonly lengthPx: number,
    private readonly position: Vector,
    private readonly borderColor: Color,
  ) {}

  public update(entity: Entity | null) {
    if (this._entity?.onDestroy) this._entity.onDestroy()
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
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
  }

  private clear() {
    this.canvas.ctx.clearRect(
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
    this.paintBorder()
  }

  private paintBorder() {
    this.canvas.ctx.strokeStyle = this.borderColor
    this.canvas.ctx.strokeRect(
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
  }
}
