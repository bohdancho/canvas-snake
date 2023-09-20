import { config } from '~/game/core'
import { Field } from '~/game/field'
import { Vector } from '~/game/units'
import { Entity } from '..'

export class Food implements Entity {
  public readonly color = config.colors.food

  constructor(
    private readonly field: Field,
    private readonly location: Vector,
    private readonly onEaten: () => void,
  ) {
    this.field.updateSquare(location, this)
  }

  public initRender(): void {
    this.field.renderSquare(this.location)
  }

  public onDestroy(): void {
    this.onEaten()
  }
}
