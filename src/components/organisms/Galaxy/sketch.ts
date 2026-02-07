import { Mouse, Vector2D } from '@/common/classes';

export class Star {
  private effect: Effect;
  public position: Vector2D;
  public basePosition: Vector2D;
  public velocity: Vector2D;
  public acceleration: Vector2D;
  public angle: number;
  public distance: number;
  public baseDistance: number;
  public size: number;
  public color: number[];
  public orbitSpeed: number;
  public armIndex: number;
  public twinkleOffset: number;

  constructor(effect: Effect, armIndex: number, distance: number) {
    this.effect = effect;
    this.armIndex = armIndex;
    this.distance = distance;
    this.baseDistance = distance;

    // Calculate initial angle based on spiral arm
    const armAngle = (armIndex / effect.galaxy.armsCount) * Math.PI * 2;
    const spiralOffset = distance * effect.galaxy.spiralTightness;
    this.angle = armAngle + spiralOffset;

    // Add randomness to position for natural look
    const angleVariation = (Math.random() - 0.5) * 0.5;
    const distanceVariation = (Math.random() - 0.5) * 30;
    this.angle += angleVariation;
    this.distance += distanceVariation;

    // Calculate position
    this.position = this.calculatePosition();
    this.basePosition = this.position.copy();

    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);

    // Orbital speed - faster near center
    this.orbitSpeed = 0.0005 + (1 / (this.distance + 50)) * 0.02;

    // Star properties
    this.size = Math.random() * 2 + 0.5;
    // Larger stars near center
    if (this.distance < 100) {
      this.size += Math.random() * 1.5;
    }

    // Color: blues, purples, pinks, whites (HSL)
    const colorChoice = Math.random();
    if (colorChoice < 0.3) {
      // Blue
      this.color = [210 + Math.random() * 30, 80, 70 + Math.random() * 20];
    } else if (colorChoice < 0.5) {
      // Purple
      this.color = [270 + Math.random() * 30, 70, 65 + Math.random() * 20];
    } else if (colorChoice < 0.7) {
      // Pink
      this.color = [300 + Math.random() * 30, 60, 70 + Math.random() * 20];
    } else {
      // White/light blue
      this.color = [200 + Math.random() * 40, 20, 85 + Math.random() * 15];
    }

    // Twinkle effect offset
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  private calculatePosition(): Vector2D {
    const { center } = this.effect;
    const x = center.x + Math.cos(this.angle) * this.distance;
    const y = center.y + Math.sin(this.angle) * this.distance;
    return new Vector2D(x, y);
  }

  private attractToMouse() {
    const { mouse } = this.effect;
    if (!mouse.isMouseOver) return;

    const dir = Vector2D.sub(mouse.position, this.position);
    const dist = dir.mag();

    if (dist < 200) {
      dir.normalize();
      const strength = (200 - dist) / 200;
      dir.mult(strength * 0.5);
      this.applyForce(dir);
    }
  }

  private applyForce(force: Vector2D) {
    this.acceleration.add(force);
  }

  private orbit() {
    this.angle += this.orbitSpeed;

    // Return to base position gradually
    const targetPosition = this.calculatePosition();
    const returnForce = Vector2D.sub(targetPosition, this.position);
    returnForce.mult(0.02);
    this.applyForce(returnForce);
  }

  public update() {
    this.orbit();
    this.attractToMouse();

    this.velocity.add(this.acceleration);
    this.velocity.mult(0.95); // Damping
    this.velocity.limit(3);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  public draw(ctx: CanvasRenderingContext2D, time: number) {
    const [h, s, l] = this.color;

    // Twinkle effect
    const twinkle =
      0.7 + 0.3 * Math.sin(time * 0.003 + this.twinkleOffset * 10);
    const alpha = twinkle;

    // Glow effect for larger stars
    if (this.size > 1.5) {
      const gradient = ctx.createRadialGradient(
        this.position.x,
        this.position.y,
        0,
        this.position.x,
        this.position.y,
        this.size * 4
      );
      gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, ${alpha * 0.2})`);
      gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Star core
    ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Galaxy {
  public effect: Effect;
  public stars: Star[];
  public armsCount: number;
  public spiralTightness: number;
  public starCount: number;
  public maxRadius: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.stars = [];
    this.armsCount = 8;
    this.spiralTightness = 0.003;
    this.starCount = 1200;
    this.maxRadius = 0;
  }

  public init() {
    const { ctx } = this.effect;
    this.maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4;

    // Create stars distributed across spiral arms
    for (let i = 0; i < this.starCount; i++) {
      const armIndex = i % this.armsCount;

      // Distance distribution: more stars near center
      const t = Math.random();
      const distance = t * t * this.maxRadius + 20;

      const star = new Star(this.effect, armIndex, distance);
      this.stars.push(star);
    }

    // Add extra core stars
    for (let i = 0; i < 100; i++) {
      const armIndex = Math.floor(Math.random() * this.armsCount);
      const distance = Math.random() * 60 + 10;
      const star = new Star(this.effect, armIndex, distance);
      this.stars.push(star);
    }
  }

  private drawCore(ctx: CanvasRenderingContext2D) {
    const { center } = this.effect;

    // Outer glow
    const outerGradient = ctx.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      120
    );
    outerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    outerGradient.addColorStop(0.3, 'rgba(200, 180, 255, 0.15)');
    outerGradient.addColorStop(0.6, 'rgba(150, 100, 255, 0.05)');
    outerGradient.addColorStop(1, 'rgba(100, 50, 200, 0)');

    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 120, 0, Math.PI * 2);
    ctx.fill();

    // Inner core
    const innerGradient = ctx.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      30
    );
    innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    innerGradient.addColorStop(0.5, 'rgba(255, 220, 255, 0.5)');
    innerGradient.addColorStop(1, 'rgba(200, 150, 255, 0)');

    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  public update() {
    this.stars.forEach((star) => star.update());
  }

  public draw(ctx: CanvasRenderingContext2D, time: number) {
    this.drawCore(ctx);
    this.stars.forEach((star) => star.draw(ctx, time));
  }

  public render(ctx: CanvasRenderingContext2D, time: number) {
    this.update();
    this.draw(ctx, time);
  }
}

export class Effect {
  public ctx: CanvasRenderingContext2D;
  public galaxy: Galaxy;
  public center: Vector2D;
  public mouse: Mouse;
  private time: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.center = new Vector2D(ctx.canvas.width / 2, ctx.canvas.height / 2);
    this.galaxy = new Galaxy(this);
    this.mouse = new Mouse();
    this.time = 0;
  }

  public init() {
    this.center = new Vector2D(
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    this.galaxy.stars = [];
    this.galaxy.init();
  }

  public render() {
    this.time++;
    this.galaxy.render(this.ctx, this.time);
  }
}
