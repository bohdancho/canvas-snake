import { Canvas } from './canvas'
import { Field } from './field'
import { Size } from './size'

export class Game {
  private static readonly TILE_SIZE = new Size(10, 10)
  private readonly field: Field

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    this.field = new Field(canvas, Game.TILE_SIZE)
  }

  public init(): void {
    this.field.drawField()
  }
}
