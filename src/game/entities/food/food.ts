import { config } from '~/game/core'
import { Field } from '~/game/field'
import { Vector } from '~/game/units'
import { Entity } from '..'

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
