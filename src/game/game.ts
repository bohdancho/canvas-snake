import { Canvas } from './canvas'
import { Field } from './field'

export class Game {
  private static readonly SQUARE_SIZE_PX = 20
  private readonly field: Field

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    this.field = new Field(canvas, Game.SQUARE_SIZE_PX)
  }

  public init(): void {
    this.field.render()
  }
}
