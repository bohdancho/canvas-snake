import { Direction } from '../enums/direction.enum'
import { Canvas } from './canvas'
import { Field } from './field'
import { Keyboard } from './keyboard'
import { Snake } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field)
    const keyboard = new Keyboard(this.actions)

    this.field = field
    this.snake = snake
    this.keyboard = keyboard
  }

  public init(): void {
    this.field.initRender()
    this.snake.initRender()
    this.keyboard.listen()

    setInterval(() => this.snake.move(), 500)
  }

  private readonly actions = {
    changeDirection: (direction: Direction) => {
      console.log(direction)
    },
  }
}
