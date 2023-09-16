export class Canvas {
  private width: number
  private height: number
  private ctx: CanvasRenderingContext2D

  constructor(elem: HTMLCanvasElement) {
    this.ctx = Canvas.getContext(elem)

    const { width, height } = elem.getBoundingClientRect()
    this.width = width
    this.height = height
  }

  public drawGreenRect() {
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  private static getContext(elem: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = elem.getContext('2d')
    if (!ctx) {
      throw Error('No ctx')
    }
    return ctx
  }
}
