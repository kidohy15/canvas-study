// 캔버스 생성 변수
const canvas = document.querySelector('canvas') // 캔버스 태그를 가져온다
const ctx = canvas.getContext('2d') // 캔버스 도구인 context를 가져온다
const dpr = window.devicePixelRatio // 캔버스를 좀 더 선명하게 사용하기 위해서 dpr 을 가져온다

// fps 개념을 도입하기 위한 변수들
const fps = 60
const interval = 1000 / fps
let now, delta
let then = Date.now()

let canvasWidth, canvasHeight

function init() {
  canvasWidth = innerWidth
  canvasHeight = innerHeight

  // 캔버스 자체 크기를 dpr 만큼 곱해서 확대시킨다
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)

  // css 로 강제로 캔버스 크기를 inner크기 에 맞춰서 줄여주면 캔버스 내 대상이 선명해지게 한다
  canvas.style.width = canvasWidth = 'px'
  canvas.style.height = canvasHeight = 'px'
}

function render() {
  requestAnimationFrame(render)
  now = Date.now()
  delta = now - then
  if (delta < interval) return

  ctx.fillRect(100, 100, 200, 200)

  then = now - (delta % interval)
}

window.addEventListener('load', () => {
  init()
  render()
})

window.addEventListener('resize', () => {
  init()
})