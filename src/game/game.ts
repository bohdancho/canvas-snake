import { Canvas } from './canvas'
import { Field } from './field'
import { FoodManager } from './foodManager'
import { Keyboard } from './keyboard'
import { Snake } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private foodManager: FoodManager

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field, this.onLoss)

    this.field = field
    this.snake = snake
    this.keyboard = new Keyboard({
      changeDirection: (direction) => (this.snake.direction = direction),
    })
    this.foodManager = new FoodManager(field)
  }

  public start(): void {
    this.field.initRender()
    this.snake.startMoving()
    this.foodManager.init()
    this.keyboard.listen()
  }

  private onLoss() {
    alert('you lost')
  }
}
