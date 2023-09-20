import 'reset-css'
import { Game } from './game/game'
import './styles.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const startScreen = document.querySelector('#startScreen')
const lossScreen = document.querySelector('#lossScreen')
if (!canvas || !startScreen || !lossScreen) {
  throw Error('Necessary HTML Elements missing')
}

new Game(canvas, startScreen, lossScreen)
