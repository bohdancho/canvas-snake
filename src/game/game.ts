import { Canvas, Keyboard } from './core'
import { FoodManager, Snake } from './entities'
import { Field } from './field'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private readonly foodManager: FoodManager

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    this.field = new Field(canvas)
    this.snake = new Snake(this.field, this.onLoss)
    this.keyboard = new Keyboard({
      changeDirection: (direction) => (this.snake.direction = direction),
    } as const)
    this.foodManager = new FoodManager(this.field)
  }

  public start(): void {
    this.field.initRender()
    this.snake.startMoving()
    this.foodManager.init()
    this.keyboard.listen()
  }

  private onLoss(): void {
    alert('you lost')
  }
}
