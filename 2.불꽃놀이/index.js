import CanvasOption from "./js/CanvasOption.js";

class Canvas extends CanvasOption {
  constructor() {
    super()
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;

    // 캔버스 자체 크기를 dpr 만큼 곱해서 확대시킨다
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  
    // css 로 강제로 캔버스 크기를 inner크기 에 맞춰서 줄여주면 캔버스 내 대상이 선명해지게 한다
    this.canvas.style.width = this.canvasWidth = "px";
    this.canvas.style.height = this.canvasHeight = "px";
  }

  render() {

    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;
    
      this.ctx.fillRect(100, 100, 200, 200);
    
      then = now - (delta % this.interval);
    }
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas()

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
