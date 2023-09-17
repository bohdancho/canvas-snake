import { Canvas } from './canvas'
import { Direction, isValidDirectionChange } from './direction'
import { Field } from './field'
import { Food } from './food'
import { Keyboard } from './keyboard'
import { Snake } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private food: Food

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)
    const field = new Field(canvas)
    const snake = new Snake(field, this.onLoss)

    this.field = field
    this.snake = snake
    this.keyboard = new Keyboard(this.actions)
    this.food = this.generateFood()
  }

  public start(): void {
    this.field.initRender()
    this.snake.startSnake()
    this.keyboard.listen()
  }

  private generateFood(): Food {
    return new Food(
      this.field,
      this.field.getRandomFreePosition(),
      this.actions.foodEaten,
    )
  }

  private onLoss() {
    alert('you lost')
  }

  private readonly actions = {
    changeDirection: (direction: Direction) => {
      if (isValidDirectionChange(this.snake.direction, direction)) {
        this.snake.direction = direction
      }
    },
    foodEaten: () => {
      this.food = this.generateFood()
      this.food.initRender()
    },
  }
}
