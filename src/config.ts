export const SQUARE_SIZE_PX = 20
export const SNAKE_INIT_SIZE = 3

export const COLORS = {
  grid: 'grey',
  snake: 'blue',
} as const
export type Color = (typeof COLORS)[keyof typeof COLORS]
