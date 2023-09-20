export function speed(canvas) {
  let raf

  const { width, height } = canvas.getBoundingClientRect()
  const ctx = canvas.getContext('2d')
  const radius = 30

  const xMin = radius
  const yMin = radius * 2
  const xMax = width - radius
  const yMax = height - radius

  let vy = 0.3
  let vx = 0.8

  const x0 = xMin
  const y0 = yMin

  let x = x0
  let y = y0

  let t

  function drawBall() {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    ctx.fill()
  }

  function render() {
    if (y < yMin || y > yMax) {
      vy = -vy
    }
    if (x < xMin || x > xMax) {
      vx = -vx
    }

    const tCurrent = Date.now()
    if (!t) t = tCurrent
    const delta = tCurrent - t
    t = tCurrent

    ctx.clearRect(0, 0, width, height)
    drawBall()

    y += vy * delta
    x += vx * delta

    vy *= 0.99
    vy += 0.01

    raf = window.requestAnimationFrame(render)
  }

  canvas.addEventListener('mouseover', () => (raf = window.requestAnimationFrame(render)))
  canvas.addEventListener('mouseleave', () => window.cancelAnimationFrame(raf))

  drawBall()
}
