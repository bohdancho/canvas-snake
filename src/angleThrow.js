export function angledThrow(canvas) {
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const radius = 15

  const xMin = radius
  const xMax = width - radius
  const yMin = radius
  const yMax = height - radius

  const ay = 0.02
  let vy = -4.5
  let vx = 1

  let x = xMin
  let y = yMax

  let t
  let running = false
  const speed = 0.6

  function drawBall() {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    ctx.fill()
  }

  function render() {
    const tCurrent = Date.now()
    if (!t) t = tCurrent
    const delta = (tCurrent - t) * speed
    t = tCurrent

    drawBall()

    if (running) {
      vy += ay * delta
      y += vy * delta
      x += vx * delta
    }

    if (y > yMax || y < yMin) {
      vy = -0.9 * vy
      vx = 0.99 * vx
      y = Math.min(Math.max(y, yMin), yMax)
    }

    if (x > xMax || x < xMin) {
      vx = -vx
      x = Math.min(Math.max(x, xMin), xMax)
    }

    window.requestAnimationFrame(render)
  }
  render()

  canvas.addEventListener('mouseenter', () => (running = true))
  canvas.addEventListener('mouseleave', () => (running = false))
}
