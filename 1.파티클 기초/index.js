const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio

// console.log(canvas)
// console.log(ctx)
// console.log(window.devicePixelRatio);

// const canvasWidth = 300;
// const canvasHeight = 300;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

// canvas.style.width = canvasWidth + 'px'
// canvas.style.height = canvssHeight + 'px'

canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr, dpr)

// 사각형 그리기
// ctx.fillRect(10, 10, 50, 50)

// 내부가 채워져있는 원
ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI / 180 * 360)
ctx.fillStyle = 'red'
ctx.fill()
ctx.closePath()

// 테두리 원
ctx.beginPath()
ctx.arc(150, 150, 50, 0, Math.PI / 180 * 360)
ctx.stroke()
ctx.closePath()

// gooey 속성값
const feGaussianBlur = document.querySelector('feGaussianBlur')
const feColorMatrix = document.querySelector('feColorMatrix')

// 컨트롤 패널 함수
const controls = new function () {
  this.blurValue = 40
  this.alphaChannel = 100
  this.alphaOffset = -23
  this.acc = 1.03
}

// dat.GUI 객체 생성 -> 컨트롤 패널 생성됨
let gui = new dat.GUI();

// 그룹핑할 폴더 생성
const f1 = gui.addFolder('Gooey Effect')
f1.open()

// 컨트롤 패널에 제어 가능한 패널 항목 추가
// gooey같은 svg 내 속성 태그일 시
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
  feGaussianBlur.setAttribute('stdDeviation', value)
});
f1.add(controls, 'alphaChannel', 1, 200).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`)
})
f1.add(controls, 'alphaOffset', -40, 40).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`)
})

// gooey가 아닌 클래스 객체의 속성을 활용하는 경우
const f2 = gui.addFolder('Particle Effect')
f2.open()

f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value => {
  particles.forEach(particle => particle.acc = value)
})


// 파티클 클래스
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.03
    // this.friction = 0.93 // 브레이크
  }

  update() {
    this.vy *= this.acc
    // this.vy *= this.friction // 브레이크
    this.y += this.vy
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = 'orange'
    ctx.fill()
    ctx.closePath()
  }
}

// const x = 100
// const y = 100
// const radius = 50
// const particle = new Particle(x, y, radius)
const TOTAl = 20
const randomNumBetwwen = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

let particles = []

for (let i = 0; i < TOTAl; i++) {
  const x = randomNumBetwwen(0, canvasWidth)
  const y = randomNumBetwwen(0, canvasHeight)
  const radius = randomNumBetwwen(50, 100)
  // const radius = randomNumBetwwen(100, 200)
  const vy = randomNumBetwwen(1, 5)
  const particle = new Particle(x, y, radius, vy)
  particles.push(particle)
}

console.log(particles)

let interval = 1000 / 60 // 60FPS를 타겟으로 하는 interval
let now, delta
let then = Date.now()

function animate() {
  window.requestAnimationFrame(animate)
  now = Date.now() // 애니메이션 실행 시 마다 now 값을 얻는다
  delta = now - then
  
  if (delta < interval) return
  
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  
  // particle.y += 1
  // particle.draw()

  particles.forEach(particle => {
    particle.update()
    particle.draw()

    if (particle.y - particle.radius > canvasHeight) { 
      particle.y = -particle.radius
      particle.x = randomNumBetwwen(0, canvasWidth)
      particle.radius = randomNumBetwwen(50, 100)
      particle.vy = randomNumBetwwen(1, 5)
    } 
  })

  then = now - (delta % interval)
}

animate()
