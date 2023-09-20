export function horizontalThrow(canvas) {
  const { width, height } = canvas.getBoundingClientRect()
  const ctx = canvas.getContext('2d')
  const radius = 30

  const xMin = radius
  const yMin = radius
  const yMax = height - radius

  const ay = 0.0003
  let vy = 0
  const vx = 0.3

  const x0 = xMin
  const y0 = yMin

  let x = x0
  let y = y0

  let t
  let running = false

  function drawBall() {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    ctx.fill()
  }

  function render() {
    if (y > yMax) {
      return
    }

    const tCurrent = Date.now()
    if (!t) t = tCurrent
    const delta = tCurrent - t
    t = tCurrent

    drawBall()

    if (running) {
      vy += ay * delta
      y += vy * delta
      x += vx * delta
    }

    window.requestAnimationFrame(render)
  }
  render()

  canvas.addEventListener('mouseenter', () => (running = true))
  canvas.addEventListener('mouseleave', () => (running = false))
}
