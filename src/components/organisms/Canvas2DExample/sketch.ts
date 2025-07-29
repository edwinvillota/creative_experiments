import { Mouse, Vector2D } from '@/common/classes';

export class Spawn {
  private effect: Effect;
  public position!: Vector2D;
  public velocity!: Vector2D;
  public acceleration!: Vector2D;
  public color: number[];

  constructor(effect: Effect) {
    this.effect = effect;
    this.position = new Vector2D(
      Math.random() * this.effect.ctx.canvas.width,
      Math.random() * this.effect.ctx.canvas.height
    );
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.color = [Math.floor(Math.random() * 360), 100, 30, 1];
  }

  private infiniteEdges() {
    if (this.position.x > this.effect.ctx.canvas.width) {
      this.position.x = 0;
      this.changeColor();
    }
    if (this.position.x < 0) {
      this.position.x = this.effect.ctx.canvas.width;
      this.changeColor();
    }
    if (this.position.y > this.effect.ctx.canvas.height) {
      this.position.y = 0;
      this.changeColor();
    }
    if (this.position.y < 0) {
      this.position.y = this.effect.ctx.canvas.height;
      this.changeColor();
    }
  }

  private attractToMouse() {
    const mouse = this.effect.mouse;
    const dir = Vector2D.sub(mouse.position, this.position);
    dir.normalize();
    dir.mult(1);
    this.applyForce(dir);
  }

  private changeColor() {
    const r = Math.random();
    if (r > 0.9) {
      this.color[0] += Math.random() * 360;
    }
  }

  public update() {
    this.velocity.limit(15);
    this.createParticles();
    if (this.effect.mouse.isMouseOver) {
      this.attractToMouse();
    } else {
      this.randomMovement();
    }
    this.infiniteEdges();
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  private createParticles() {
    const particlesPerFrame = 5;

    for (let i = 0; i < particlesPerFrame; i++) {
      const particle = new Particle(this.effect, [...this.color]);
      particle.velocity.add(
        Vector2D.random({
          x: { min: -0.5, max: 0.5 },
          y: { min: -0.5, max: 0.5 },
        })
      );
      particle.position = this.position.copy();
      this.effect.particles.push(particle);
    }
  }

  private randomMovement() {
    const prob = Math.random();

    if (prob > 0.5) {
      const dir = Vector2D.random({
        x: { min: -1, max: 1 },
        y: { min: -1, max: 1 },
      });
      dir.normalize();
      dir.mult(5);
      this.applyForce(dir);
    }
  }

  private applyForce(force: Vector2D) {
    this.acceleration.add(force);
  }

  public draw() {
    const { ctx } = this.effect;
    ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Particle {
  private effect: Effect;
  public position!: Vector2D;
  public velocity!: Vector2D;
  public acceleration!: Vector2D;
  public size: number;
  public color: number[];

  constructor(effect: Effect, color: number[]) {
    this.effect = effect;
    this.position = new Vector2D(
      Math.random() * this.effect.ctx.canvas.width,
      Math.random() * this.effect.ctx.canvas.height
    );
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0.0);
    this.size = Math.floor(Math.random() * 80 + 2);
    this.color = color;
  }

  public applyForce(force: Vector2D) {
    this.acceleration.add(force);
  }

  private infiniteEdges() {
    if (this.position.x > this.effect.ctx.canvas.width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = this.effect.ctx.canvas.width;
    }
    if (this.position.y > this.effect.ctx.canvas.height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = this.effect.ctx.canvas.height;
    }
  }

  public update() {
    this.velocity.limit(6);
    if (this.color[2] < 100) {
      this.color[2] += 0.5;
    } else {
      this.color[2] = 100;
    }
    if (this.size >= 0.2) {
      this.size += 0.2;
    } else {
      this.size = 0;
    }

    this.infiniteEdges();
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  public draw() {
    const { ctx } = this.effect;
    const [h, s, l, a] = this.color;

    ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Effect {
  public ctx: CanvasRenderingContext2D;
  public particles: Particle[];
  public mouse: Mouse;
  public spawns!: Spawn[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.particles = [];
    this.spawns = [];
    this.mouse = new Mouse();
  }

  public init() {
    Array.from({ length: 2 }).forEach(() => {
      const spawn = new Spawn(this);
      this.spawns.push(spawn);
    });
  }

  public render() {
    this.spawns.forEach((spawn) => {
      spawn.update();
    });

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].size < 1 || this.particles[i].color[2] > 99) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].draw();
        this.particles[i].update();
      }
    }
  }
}
