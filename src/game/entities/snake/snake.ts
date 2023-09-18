import { config } from '~/game/core'
import { Field } from '~/game/field'
import { Direction, randomDirection } from '~/game/units'
import { Entity } from '..'
import { SnakeBody } from './snakeBody'
import { SnakeMover } from './snakeMover'

export class Snake implements Entity {
  public readonly color = config.colors.snake
  private readonly body: SnakeBody
  private readonly mover: SnakeMover

  constructor(private readonly field: Field, private readonly onCollapse: () => void) {
    const initDirection = randomDirection()
    this.body = new SnakeBody(this, this.field, config.snake.initLength, initDirection)
    this.mover = new SnakeMover(
      this.body,
      this.onCollapse,
      config.snake.moveFrequencyMs,
      initDirection,
    )
  }

  public startMoving(): void {
    this.mover.startMoving()
  }

  public get direction(): Direction {
    return this.mover.direction
  }

  public set direction(direction: Direction) {
    this.mover.direction = direction
  }
}
