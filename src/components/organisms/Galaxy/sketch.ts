import { Vector2D } from '@/common/classes';

export class Effect {
  public ctx: CanvasRenderingContext2D;
  public galaxy!: Galaxy;
  public center!: Vector2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.init();
  }

  public init() {
    this.galaxy = new Galaxy(this);
    this.center = new Vector2D(
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  public render() {
    this.galaxy.render();
  }
}

export class Galaxy {
  public effect: Effect;
  public branchesCount!: number;
  public branchLength!: number;
  public branchSegments!: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.init();
  }

  public init() {
    const { ctx } = this.effect;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    this.branchesCount = 10;
    this.branchLength = 300;
    this.branchSegments = 10;
  }

  public draw() {
    const { ctx, center } = this.effect;
    ctx.fillStyle = 'white';

    for (let i = 0; i < this.branchesCount; i++) {
      const angle = (Math.PI * 2) / this.branchesCount;
      const x = center.x + Math.cos(angle * i) * this.branchLength;
      const y = center.y + Math.sin(angle * i) * this.branchLength;
      const branch = new Vector2D(x, y);

      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(branch.x, branch.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  public render() {
    this.draw();
  }
}
