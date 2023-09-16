import { Color } from './../config'
export interface Entity {
  color: Color
  onDestroy?: () => void
}
