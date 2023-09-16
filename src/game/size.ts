export class Size {
  public readonly width: number
  public readonly height: number
  constructor({ width, height }: { width: number; height: number }) {
    this.width = width
    this.height = height
  }
}
