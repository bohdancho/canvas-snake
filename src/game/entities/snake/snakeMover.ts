import { config } from '~/game/core'
import { Field } from '~/game/field'
import { Direction, Vector, isValidDirectionChange } from '~/game/units'
import { Food, Snake } from '..'

export class SnakeMover {
  private _direction: Direction
  private requestedDirection?: Direction
  private moveInterval?: ReturnType<typeof setInterval>
  private readonly moveFrequency = config.snake.moveFrequencyMs

  constructor(
    private readonly field: Field,
    private readonly body: Vector[],
    private readonly grow: (move: Vector) => void,
    private readonly trimTail: () => void,
    private readonly onCollapse: () => void,
    initDirection: Direction,
  ) {
    this._direction = initDirection
  }

  public get direction(): Direction {
    return this._direction
  }

  public set direction(direction: Direction) {
    if (isValidDirectionChange(this.direction, direction)) {
      this.requestedDirection = direction
    }
  }

  public startMoving(): void {
    this.moveInterval = setInterval(() => this.move(), this.moveFrequency)
  }

  private stopMoving(): void {
    clearInterval(this.moveInterval)
  }

  private move(): void {
    if (this.requestedDirection) {
      this._direction = this.requestedDirection
      this.requestedDirection = undefined
    }

    const move = this.getMove()

    const willEat = this.willEat(move)
    if (this.willCollapse(move)) {
      this.stopMoving()
      this.onCollapse()
      return
    }

    this.grow(move)
    if (!willEat) {
      this.trimTail()
    }
  }

  private willCollapse(move: Vector): boolean {
    return this.field.getSquare(move).entity instanceof Snake
  }

  private willEat(move: Vector): boolean {
    return this.field.getSquare(move).entity instanceof Food
  }

  private getMove(): Vector {
    const last = Field.getLastSquare(this.body)
    const square = Field.getConnectedSquare(this.direction, last)
    const validPosition = { x: square.x, y: square.y }

    const axes = ['x', 'y'] as const
    axes.forEach((axis) => {
      if (square[axis] >= this.field.length) {
        validPosition[axis] = 0
      }
      if (square[axis] < 0) {
        validPosition[axis] = this.field.length - 1
      }
    })

    return new Vector(validPosition.x, validPosition.y)
  }
}
