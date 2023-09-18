import { Vector } from '~/game/units'

export class SnakeBodySegment {
  private _location: Vector

  constructor(initialLocation: Vector) {
    this._location = initialLocation
  }

  public get location(): Vector {
    return this._location
  }
}
