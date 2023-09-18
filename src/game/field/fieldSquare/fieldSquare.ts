import { Canvas } from '~/game/core'
import { Entity } from '~/game/entities'
import { Vector } from '~/game/units'
import { ReadonlyMatrix } from '~/utils'
import { FieldSquarePixel } from './fieldSquarePixel'

export class FieldSquare {
  private _entity?: Entity
  private readonly pixels: ReadonlyMatrix<FieldSquarePixel>

  constructor(canvas: Canvas, lengthPx: number, location: Vector, resolution: number) {
    this.pixels = FieldSquare.getInitialPixels(canvas, lengthPx, location, resolution)
  }

  public render(): void {
    this.pixels.forEach((row) =>
      row.forEach((pixel) => {
        pixel.color = this._entity?.color
      }),
    )
  }

  public get entity(): Entity | undefined {
    return this._entity
  }

  public set entity(entity: Entity | undefined) {
    const entityChanged = this._entity !== entity
    if (entityChanged) {
      this._entity?.onDestroy?.()
    }
    this._entity = entity
  }

  private static getInitialPixels(
    canvas: Canvas,
    squareLengthPx: number,
    location: Vector,
    resolution: number,
  ): FieldSquarePixel[][] {
    const pixels: FieldSquarePixel[][] = []
    for (let y = 0; y < resolution; y++) {
      pixels[y] = []
      for (let x = 0; x < resolution; x++) {
        const pixelX = location.x * resolution + x
        const pixelY = location.y * resolution + y

        const pixelLengthPx = Math.floor(squareLengthPx / resolution)
        pixels[y][x] = new FieldSquarePixel(canvas, pixelLengthPx, new Vector(pixelX, pixelY))
      }
    }
    return pixels
  }
}
