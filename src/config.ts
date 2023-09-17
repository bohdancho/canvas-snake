export const FIELD_LENGTH = 10
export const SNAKE_INIT_SIZE = 3
export const SNAKE_MOVE_FREQUENCY = 200

export const COLORS = {
  grid: 'grey',
  snake: 'blue',
  food: 'red',
} as const
export type Color = (typeof COLORS)[keyof typeof COLORS]
