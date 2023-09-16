import { Canvas } from './canvas'
import { Field } from './field'
import { Snake } from './snake'

export class Game {
  private static readonly SQUARE_SIZE_PX = 20
  private readonly field: Field
  private readonly snake: Snake

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas, Game.SQUARE_SIZE_PX)
    const snake = new Snake(field)

    this.field = field
    this.snake = snake
  }

  public init(): void {
    this.field.render()
    this.snake.render()
  }
}
