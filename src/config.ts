export const SQUARE_SIZE_PX = 40
export const SNAKE_INIT_SIZE = 5

export const COLORS = {
  grid: 'grey',
  snake: 'blue',
  food: 'red',
} as const
export type Color = (typeof COLORS)[keyof typeof COLORS]
