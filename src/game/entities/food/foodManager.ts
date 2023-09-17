import { Field } from '~/game/field'
import { Food } from '.'

export class FoodManager {
  private food?: Food

  constructor(private readonly field: Field) {}

  public init(): void {
    this.generateFood()
  }

  private generateFood(): void {
    this.food = new Food(this.field, this.field.getRandomFreeLocation(), this.onEaten.bind(this))
    this.food.initRender()
  }

  private onEaten(): void {
    this.generateFood()
  }
}
