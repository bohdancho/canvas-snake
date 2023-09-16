import { Canvas } from './canvas'
import { Field } from './field'

export class Game {
  private static readonly TILE_SIZE = 20
  private readonly field: Field

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    this.field = new Field(canvas)
  }

  public init(): void {
    this.field.drawField()
  }
}
