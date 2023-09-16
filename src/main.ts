import 'reset-css'
import { Game } from './game/game'
import './styles.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
if (!canvas) {
  throw Error('No canvas')
}

const game = new Game(canvas)
game.start()
