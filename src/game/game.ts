import { Canvas } from './canvas'
import { Direction, isValidDirectionChange } from './direction'
import { Field } from './field'
import { Food } from './food'
import { Keyboard } from './keyboard'
import { Snake, SnakeCollapcedException } from './snake'

export class Game {
  private readonly field: Field
  private readonly snake: Snake
  private readonly keyboard: Keyboard
  private food: Food
  private tickInterval?: ReturnType<typeof setInterval>
  private lost = false

  constructor(canvasElem: HTMLCanvasElement) {
    const canvas = new Canvas(canvasElem)

    const field = new Field(canvas)
    this.field = field

    const snake = new Snake(field)
    this.snake = snake

    const food = this.generateFood()
    this.food = food

    this.keyboard = new Keyboard(this.actions)
  }

  public start(): void {
    this.field.initRender()
    this.snake.initRender()
    this.food.initRender()
    this.startSnake()
    this.keyboard.listen()
  }

  private generateFood(): Food {
    return new Food(
      this.field,
      this.field.getRandomFreePosition(),
      this.actions.foodEaten,
    )
  }

  private restartSnake() {
    clearInterval(this.tickInterval)
    this.startSnake()
  }

  private startSnake() {
    this.tickInterval = setInterval(() => this.snake.move(), 500)
  }

  private onLoss() {
    clearInterval(this.tickInterval)
    this.lost = true
    alert('you lost')
  }

  private readonly actions = {
    changeDirection: (direction: Direction) => {
      if (this.lost || !isValidDirectionChange(this.snake.direction, direction)) {
        return
      }
      this.snake.direction = direction
      try {
        this.snake.move()
        this.restartSnake()
      } catch (error) {
        if (error instanceof SnakeCollapcedException) {
          clearInterval(this.tickInterval)
          this.onLoss()
        }
      }
    },
    foodEaten: () => {
      this.food = this.generateFood()
      this.food.initRender()
    },
  }
}
