import { Field } from '~/game/field'
import { Direction, Vector } from '~/game/units'
import { Snake } from '..'
import { Food } from '../..'
import { SnakeBodySegment } from './snakeBodySegment'

export class SnakeBody {
  public readonly segments: SnakeBodySegment[]

  constructor(
    private readonly snake: Snake,
    private readonly field: Field,
    initialLength: number,
    initialDirection: Direction,
  ) {
    this.segments = SnakeBody.getInitialSegments(this.field, initialDirection, initialLength)
    this.segments.forEach((segment) => this.field.updateSquare(segment.location, snake))
  }

  public growForward(validDirection: Direction): { event: null | 'ateFood' | 'collapsed' } {
    const headSegment = SnakeBody.getLastSegment(this.segments)

    const location = Field.getConnectedLocation(validDirection, headSegment.location)
    const transpiledLocation = SnakeBody.transpileLocation(location, this.field.length)
    const replacedEntity = this.field.getSquare(transpiledLocation).entity

    if (replacedEntity === this.snake) {
      return { event: 'collapsed' }
    }
    const event = replacedEntity instanceof Food ? 'ateFood' : null

    this.segments.push(new SnakeBodySegment(transpiledLocation))
    this.field.updateSquare(transpiledLocation, this.snake)
    this.field.renderSquare(transpiledLocation)
    return { event }
  }

  public trimTail(): void {
    const removedSegment = this.segments.shift()
    if (!removedSegment) throw Error('Snake trimTail failed')
    this.field.updateSquare(removedSegment.location, undefined)
    this.field.renderSquare(removedSegment.location)
  }

  private static transpileLocation(location: Vector, fieldLength: number): Vector {
    const validLocation = { x: location.x, y: location.y }

    const axes = ['x', 'y'] as const
    axes.forEach((axis) => {
      if (location[axis] >= fieldLength) {
        validLocation[axis] = 0
      }
      if (location[axis] < 0) {
        validLocation[axis] = fieldLength - 1
      }
    })

    return new Vector(validLocation.x, validLocation.y)
  }

  private static getInitialSegments(
    field: Field,
    direction: Direction,
    length: number,
  ): SnakeBodySegment[] {
    const startLocation = Vector.random(field.length)
    const startSegment = new SnakeBodySegment(startLocation)

    const segments = [startSegment]
    while (segments.length < length) {
      const prevSegment = SnakeBody.getLastSegment(segments)
      const location = Field.getConnectedLocation(direction, prevSegment.location)
      segments.push(new SnakeBodySegment(location))
    }

    const headSegment = SnakeBody.getLastSegment(segments)
    if (!field.isValidLocation(headSegment.location)) {
      return SnakeBody.getInitialSegments(field, direction, length)
    }
    return segments
  }

  private static getLastSegment(segments: SnakeBodySegment[]): SnakeBodySegment {
    const last = segments.at(-1)
    if (!last) throw Error('Snake without segments')
    return last
  }
}
