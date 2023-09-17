export const config = {
  field: {
    length: 10,
  },
  snake: {
    initLength: 3,
    moveFrequencyMs: 200,
  },
  colors: {
    grid: 'grey',
    snake: 'blue',
    food: 'red',
  },
} as const

export type Color = (typeof config)['colors'][keyof (typeof config)['colors']]
