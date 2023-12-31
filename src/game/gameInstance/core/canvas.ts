export class Canvas {
  public readonly sizePx: number
  public readonly ctx: CanvasRenderingContext2D

  constructor(elem: HTMLCanvasElement) {
    this.ctx = Canvas.getContext(elem)

    const { width, height } = elem.getBoundingClientRect()
    elem.width = width
    elem.height = height
    this.sizePx = width
  }

  private static getContext(elem: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = elem.getContext('2d')
    if (!ctx) {
      throw Error('No ctx')
    }
    return ctx
  }
}
