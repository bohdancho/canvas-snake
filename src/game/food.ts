import { COLORS } from '../config'
import { Field } from './field'
import { Vector } from './vector'

export class Food {
  constructor(private readonly field: Field, private readonly position: Vector) {
    this.field.paintSquare(this.position, COLORS.food)
  }
}
