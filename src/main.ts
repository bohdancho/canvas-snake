import './default.css'
import { Game } from './game/game'
import './styles.css'

function init() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
  if (!canvas) {
    throw Error('No canvas')
  }

  const game = new Game(canvas)
  game.init()
}

init()
