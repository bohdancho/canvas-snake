import { GameInstance } from './gameInstance/gameInstance'

export class Game {
  private gameInstance: GameInstance

  constructor(private readonly canvas: HTMLCanvasElement, startScreen: Element) {
    this.gameInstance = new GameInstance(this.canvas)
    this.addStartListener(startScreen)
  }

  private addStartListener(startScreen: Element): void {
    const startListener = (): void => {
      startScreen.classList.add('closed')

      this.gameInstance.start()

      document.removeEventListener('keydown', startListener)
    }

    document.addEventListener('keydown', startListener)
  }
}
