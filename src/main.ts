import 'reset-css'
import { Game } from './game/game'
import './styles.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const startScreen = document.querySelector('#startScreen')
if (!canvas || !startScreen) {
  throw Error('Necessary HTML Elements missing')
}

new Game(canvas, startScreen)
