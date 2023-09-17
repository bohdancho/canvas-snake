import { Canvas } from '../canvas'
import { Color } from '../config'
import { Entity } from '../entities/entity'
import { Vector } from '../units/vector'

export class Square {
  private _entity: Entity | null = null

  constructor(
    private readonly canvas: Canvas,
    private readonly lengthPx: number,
    private readonly position: Vector,
    private readonly borderColor: Color,
  ) {}

  public render(): void {
    if (this._entity) {
      this.paint(this._entity.color)
    } else {
      this.clear()
    }
  }

  public get entity(): Entity | null {
    return this._entity
  }

  public set entity(entity: Entity | null) {
    const entityChanged = this._entity !== entity
    if (entityChanged) {
      this._entity?.onDestroy?.()
    }
    this._entity = entity
  }

  private paint(color: Color): void {
    this.canvas.ctx.fillStyle = color
    this.canvas.ctx.fillRect(
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
  }

  private clear(): void {
    this.canvas.ctx.clearRect(
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
    this.paintBorder()
  }

  private paintBorder(): void {
    this.canvas.ctx.strokeStyle = this.borderColor
    this.canvas.ctx.strokeRect(
      this.lengthPx * this.position.x,
      this.lengthPx * this.position.y,
      this.lengthPx,
      this.lengthPx,
    )
  }
}
