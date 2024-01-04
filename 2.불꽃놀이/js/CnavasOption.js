export default class CanvasOption {
  constructor() {
    // 캔버스 생성 변수
    this.canvas = document.querySelector("canvas"); // 캔버스 태그를 가져온다
    this.ctx = this.canvas.getContext("2d"); // 캔버스 도구인 context를 가져온다
    this.dpr = window.devicePixelRatio; // 캔버스를 좀 더 선명하게 사용하기 위해서 dpr 을 가져온다

    // fps 개념을 도입하기 위한 변수들
    this.fps = 60;
    this.interval = 1000 / this.fps;

    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
  }
}