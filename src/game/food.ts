import { COLORS } from '../config'
import { Entity } from './entity'
import { Field } from './field'
import { Vector } from './vector'

export class Food implements Entity {
  public readonly color = COLORS.food

  constructor(private readonly field: Field, private readonly position: Vector) {
    this.field.updateSquare(position, this)
  }

  public initRender() {
    this.field.renderSquare(this.position)
  }
}
