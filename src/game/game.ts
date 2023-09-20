import { GameInstance } from './gameInstance/gameInstance'

export class Game {
  private gameInstance: GameInstance

  constructor(
    private readonly canvasElem: HTMLCanvasElement,
    startScreen: Element,
    private readonly lossScreenElem: Element,
  ) {
    this.gameInstance = new GameInstance(this.canvasElem, this.onLoss.bind(this))
    this.addStartListener(startScreen)
  }

  private addStartListener(startScreen: Element): void {
    const startListener = (): void => {
      startScreen.classList.remove('show')
      this.gameInstance.start()
      document.removeEventListener('keydown', startListener)
    }

    document.addEventListener('keydown', startListener)
  }

  private onLoss(): void {
    this.lossScreenElem.classList.add('show')
  }
}
