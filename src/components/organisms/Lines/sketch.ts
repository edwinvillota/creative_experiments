import { Vector2D } from '@/common/classes';

export class Effect {
  public ctx: CanvasRenderingContext2D;
  private atoms: Atom[] = [];
  public numberOfatoms: number;
  public atomMinMaxRadius: number[];
  public atomOrbitals: number;
  public atomOrbitalsRadius: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.numberOfatoms = 35;
    this.atomMinMaxRadius = [5, 8];
    this.atomOrbitals = 5;
    this.atomOrbitalsRadius = 20;
  }

  public init() {
    Array.from({ length: this.numberOfatoms }).forEach(() => {
      this.atoms.push(
        new Atom(
          this,
          ...this.atomMinMaxRadius,
          this.atomOrbitals,
          this.atomOrbitalsRadius
        )
      );
    });
  }

  public render() {
    this.atoms.forEach((atom) => {
      atom.render();
    });
  }
}

class Atom {
  private effect: Effect;
  public position!: Vector2D;
  public velocity!: Vector2D;
  public acceleration!: Vector2D;
  public radius!: number;
  public minRadius!: number;
  public maxRadius!: number;
  public numberOfOrbitals!: number;
  public orbitalRadius!: number;
  public orbitals: Orbital[];

  constructor(
    effect: Effect,
    minRadius = 1,
    maxRadius = 10,
    numberOfOrbitals = 3,
    orbitalRadius = 10
  ) {
    this.effect = effect;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.radius = Math.round(
      Math.random() * (maxRadius - minRadius) + minRadius
    );

    this.position = Vector2D.random({
      x: {
        min: this.radius + 1,
        max: this.effect.ctx.canvas.width - this.radius - 1,
      },
      y: {
        min: this.radius + 1,
        max: this.effect.ctx.canvas.height - this.radius - 1,
      },
    });
    this.velocity = Vector2D.random({
      x: {
        min: -1,
        max: 1,
      },
      y: {
        min: -1,
        max: 1,
      },
    });
    this.acceleration = new Vector2D(0, 0);

    this.numberOfOrbitals = numberOfOrbitals;
    this.orbitalRadius = orbitalRadius;
    this.orbitals = [];
    this.init();
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

  public init() {
    for (let i = 0; i < this.numberOfOrbitals; i++) {
      this.orbitals.push(new Orbital(this));
    }
  }

  public draw() {
    const { ctx } = this.effect;
    // Core
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  public update() {
    this.infiniteEdges();
    this.orbitals.forEach((orbital) => {
      orbital.render(this.effect.ctx);
    });

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  public render() {
    this.update();
    this.draw();
  }
}

class Orbital {
  private atom: Atom;
  public position!: Vector2D;
  public velocity!: Vector2D;
  public acceleration!: Vector2D;

  public radius!: number;
  public angle!: number;
  public speed!: number;
  public color!: number[];
  private theta!: number;
  public distance!: number;
  public minDistance!: number;

  constructor(atom: Atom) {
    this.atom = atom;
    this.color = [
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
    ];
    this.radius = this.atom.radius / 3;
    this.position = this.atom.position.copy();
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.theta = Math.random() * Math.PI * 2;
    this.minDistance = this.atom.radius + 50;

    this.speed = Math.random() * (0.1 - 0.01) + 0.01;

    this.distance =
      this.atom.orbitalRadius * Math.sin(this.theta) + this.minDistance;
  }

  public update() {
    this.distance = this.minDistance * Math.sin(this.theta);
    this.position.x =
      this.atom.position.x + this.distance * Math.cos(this.theta);
    this.position.y =
      this.atom.position.y + this.distance * Math.sin(this.theta);
    this.theta += this.speed;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 1)`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 1)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.atom.position.x, this.atom.position.y);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();
  }

  public render(ctx: CanvasRenderingContext2D) {
    this.update();
    this.draw(ctx);
  }
}
