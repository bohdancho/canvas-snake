import { Direction } from '../game/direction'
import { randomInteger } from './randomInteger'

export function randomDirection(): Direction {
  const directions = Object.values(Direction)
  const randomIndex = randomInteger(0, directions.length - 1)
  return directions[randomIndex]
}
