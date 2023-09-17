import { randomInteger } from '~/utils'

export enum Direction {
  x_pos = 'x_pos',
  x_neg = 'x_neg',
  y_pos = 'y_pos',
  y_neg = 'y_neg',
}

export function randomDirection(): Direction {
  const directions = Object.values(Direction)
  const randomIndex = randomInteger(0, directions.length - 1)
  return directions[randomIndex]
}

export function isValidDirectionChange(a: Direction, b: Direction): boolean {
  return a[0] !== b[0]
}
