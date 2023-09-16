export class Game {
  private ctx: CanvasRenderingContext2D
  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw Error('No ctx')
    }
    this.ctx = ctx
  }
  public init() {
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(10, 10, 150, 100)
  }
}
