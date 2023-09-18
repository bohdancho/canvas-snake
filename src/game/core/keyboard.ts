import { Direction } from '~/game/units'

const KEY_DIRECTION_MAP = {
  ArrowLeft: Direction.x_neg,
  ArrowRight: Direction.x_pos,
  ArrowUp: Direction.y_neg,
  ArrowDown: Direction.y_pos,
} as const

type SupportedKey = keyof typeof KEY_DIRECTION_MAP
type Actions = {
  changeDirection: (direction: Direction) => void
}

export class Keyboard {
  constructor(private readonly actions: Actions) {}

  public listen(): void {
    document.addEventListener('keydown', ({ key }) => {
      if (isSupportedKey(key)) {
        this.actions.changeDirection(KEY_DIRECTION_MAP[key])
      }
    })
  }
}

function isSupportedKey(key: string): key is SupportedKey {
  return Object.keys(KEY_DIRECTION_MAP).includes(key)
}