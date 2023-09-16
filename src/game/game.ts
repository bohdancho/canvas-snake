import { Canvas } from './canvas'

export class Game {
  private canvas: Canvas

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = new Canvas(canvas)
  }

  public init(): void {
    this.canvas.drawGreenRect()
  }
}
