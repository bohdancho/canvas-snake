import { Canvas } from './canvas'
import { Direction, isValidDirectionChange } from './direction'
import { Field } from './field'
import { Keyboard } from './keyboard'
import { Snake } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private tickInterval?: ReturnType<typeof setInterval>
  private lost = false

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field, this.events.loss)
    const keyboard = new Keyboard(this.actions)

    this.field = field
    this.snake = snake
    this.keyboard = keyboard
  }

  public init(): void {
    this.field.initRender()
    this.snake.initRender()
    this.startSnake()
    this.keyboard.listen()
  }

  private restartSnake() {
    clearInterval(this.tickInterval)
    this.startSnake()
  }

  private startSnake() {
    this.tickInterval = setInterval(() => this.snake.move(), 500)
  }

  private readonly events = {
    loss: () => {
      clearInterval(this.tickInterval)
      this.lost = true
      alert('you lost')
    },
  }

  private readonly actions = {
    changeDirection: (direction: Direction) => {
      if (this.lost || !isValidDirectionChange(this.snake.direction, direction)) {
        return
      }
      this.snake.direction = direction
      this.snake.move()
      if (!this.lost) {
        this.restartSnake()
      }
    },
  }
}
