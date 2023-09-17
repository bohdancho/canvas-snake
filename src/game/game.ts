import { Canvas } from './canvas'
import { FoodManager } from './entities/food/foodManager'
import { Snake } from './entities/snake/snake'
import { Field } from './field/field'
import { Keyboard } from './keyboard'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private readonly foodManager: FoodManager

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field, this.onLoss)

    this.field = field
    this.snake = snake
    this.keyboard = new Keyboard({
      changeDirection: (direction) => (this.snake.direction = direction),
    } as const)
    this.foodManager = new FoodManager(field)
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
