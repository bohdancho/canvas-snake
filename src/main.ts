import 'reset-css'
import { Game } from './game/game'
import './styles.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const startScreen = document.querySelector('#startScreen')
if (!canvas || !startScreen) {
  throw Error('No necessary HTML Elements')
}

const game = new Game(canvas)
game.init()

const startListener = (): void => {
  startScreen.classList.add('closed')

  game.start()

  document.removeEventListener('keydown', startListener)
}

document.addEventListener('keydown', startListener)
