import { Field } from './field'
import { Food } from './food'

export class FoodManager {
  private food?: Food

  constructor(private readonly field: Field) {}

  public init(): void {
    this.generateFood()
  }

  private generateFood(): void {
    this.food = new Food(this.field, this.field.getRandomFreePosition(), this.onEaten.bind(this))
    this.food.initRender()
  }

  private onEaten() {
    this.generateFood()
  }
}
