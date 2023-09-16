import { Canvas } from './canvas'
import { Field } from './field'

export class Game {
  private static readonly SQUARE_SIZE = 100
  private readonly field: Field

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    this.field = new Field(canvas, Game.SQUARE_SIZE)
  }

  public init(): void {
    this.field.render()
  }
}
