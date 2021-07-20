
let graphic
let font
let canvas

function preload() {
  font = loadFont('space-grotesk.medium.otf')
}

function setup() {
  createCanvas(1080, 1080)
  background('#000000')

  // create offscreen graphics buffer
  graphic = createGraphics(width, height)

  // type setup offscreen in buffer
  graphic.textFont(font)
  graphic.textAlign(CENTER, CENTER)
  graphic.blendMode(SCREEN)
  graphic.textSize(600)
  graphic.fill('#313E59')
  graphic.text('o', width / 2, height / 3)
  graphic.textSize(550)
  graphic.fill('#F2A0AF')
  graphic.text('s', width / 1.95, height / 2.95)
  graphic.textSize(500)
  graphic.fill('#4BA695')
  graphic.text('k', width / 2.05, height / 3.05)
  graphic.fill('#BF2633')
  graphic.text('a', width / 2.15, height / 3.15)
  graphic.textSize(550)
  graphic.fill('#8C030E')
  graphic.text('r', width / 2.25, height / 3.25)
  graphic.textSize(550)
}

const loopDuration = 6 * 60

function draw() {

  let currentFrame = frameCount % loopDuration
  let t = currentFrame / loopDuration
  let u = map(t, 0, 1, 0, 2 * PI)

  background('#000000')

  const tiles = 54
  const tileSize = width / tiles

  // loop over each tile
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {

      const distortionX = cos(u + x * 0.5) * 13
      const distortionY = sin(u + y * 0.5) * 13

      // think of this as applying the grid to the source in the graphics buffer
      const sx = x * tileSize + distortionX
      const sy = y * tileSize + distortionY
      const sw = tileSize + distortionX
      const sh = tileSize + distortionY

      // and this as applying the grid to the destination on the canvas
      const dx = x * tileSize
      const dy = y * tileSize
      const dw = tileSize
      const dh = tileSize

      // grided image from buffer into main canvas
      image(graphic, dx, dy, dw, dh, sx, sy, sw, sh)
    }
  }
}