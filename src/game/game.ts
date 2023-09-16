import { Canvas } from './canvas'
import { Field } from './field'
import { Snake } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field)

    this.field = field
    this.snake = snake
  }

  public init(): void {
    this.field.initRender()
    this.snake.initRender()

    setInterval(() => this.snake.move(), 500)
  }
}
