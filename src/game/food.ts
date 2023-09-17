import { config } from './config'
import { Entity } from './entity'
import { Field } from './field'
import { Vector } from './vector'

export class Food implements Entity {
  public readonly color = config.colors.food

  constructor(
    private readonly field: Field,
    private readonly position: Vector,
    private readonly onEaten: () => void,
  ) {
    this.field.updateSquare(position, this)
  }

  public initRender() {
    this.field.renderSquare(this.position)
  }

  public onDestroy() {
    this.onEaten()
  }
}
