import { Size } from './size'

export class Canvas {
  public readonly size: Size
  public readonly ctx: CanvasRenderingContext2D

  constructor(elem: HTMLCanvasElement) {
    this.ctx = Canvas.getContext(elem)

    const { width, height } = elem.getBoundingClientRect()
    this.size = new Size(width, height)
  }

  private static getContext(elem: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = elem.getContext('2d')
    if (!ctx) {
      throw Error('No ctx')
    }
    return ctx
  }
}
