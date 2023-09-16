export class Canvas {
  private width: number
  private height: number
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = Canvas.getContext(canvas)

    const { width, height } = canvas.getBoundingClientRect()
    this.width = width
    this.height = height
  }

  public drawGreenRect() {
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  private static getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw Error('No ctx')
    }
    return ctx
  }
}
