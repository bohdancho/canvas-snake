import { config } from '../../config'
import { Field } from '../../field/field'
import { Vector } from '../../units/vector'
import { Entity } from '../entity'

export class Food implements Entity {
  public readonly color = config.colors.food

  constructor(
    private readonly field: Field,
    private readonly position: Vector,
    private readonly onEaten: () => void,
  ) {
    this.field.updateSquare(position, this)
  }

  public initRender(): void {
    this.field.renderSquare(this.position)
  }

  public onDestroy(): void {
    this.onEaten()
  }
}
