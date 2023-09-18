import { Field } from '~/game/field'
import { Direction, isValidDirectionChange } from '~/game/units'
import { SnakeBody } from '../snakeBody/snakeBody'

export class SnakeMover {
  private validDirection: Direction
  private requestedDirection?: Direction
  private moveInterval?: ReturnType<typeof setInterval>

  constructor(
    private readonly field: Field,
    private readonly body: SnakeBody,
    private readonly onCollapse: () => void,
    private readonly moveFrequencyMs: number,
    initDirection: Direction,
  ) {
    this.validDirection = initDirection
  }

  public get direction(): Direction {
    return this.validDirection
  }

  public set direction(direction: Direction) {
    if (isValidDirectionChange(this.direction, direction)) {
      this.requestedDirection = direction
    }
  }

  public startMoving(): void {
    this.moveInterval = setInterval(() => this.move(), this.moveFrequencyMs)
  }

  private stopMoving(): void {
    clearInterval(this.moveInterval)
  }

  private move(): void {
    if (this.requestedDirection) {
      this.validDirection = this.requestedDirection
      this.requestedDirection = undefined
    }

    const { event } = this.body.growForward(this.validDirection)

    if (event === 'collapsed') {
      this.stopMoving()
      this.onCollapse()
      return
    }

    if (!(event === 'ateFood')) {
      this.body.trimTail()
    }
  }
}
