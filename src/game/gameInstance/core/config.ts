export const config = {
  field: {
    length: 7,
  },
  snake: {
    initLength: 3,
    moveFrequencyMs: 300,
  },
  colors: {
    grid: '#6b7280', // tw-grey-500
    snake: '#3b82f6', // tw-blue-500
    food: '#ef4444', // tw-red-500
  },
} as const

export type Color = (typeof config)['colors'][keyof (typeof config)['colors']]
