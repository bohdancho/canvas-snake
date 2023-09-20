import { Color } from '~/game/core'

export interface Entity {
  color: Color
  onDestroy?: () => void
}
