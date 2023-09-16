import { Canvas } from './canvas'

export class Game {
  private canvas: Canvas

  constructor(canvasElem: HTMLCanvasElement) {
    this.canvas = new Canvas(canvasElem)
  }

  public init(): void {
    this.canvas.drawGreenRect()
  }
}
