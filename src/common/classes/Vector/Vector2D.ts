import type { IStaticVector2DRandomArgs, IVector } from './VectorBase';
import { VectorBase } from './VectorBase';

export class Vector2D extends VectorBase implements IVector<Vector2D> {
  constructor(x: number, y: number) {
    super(x, y);
  }

  public get isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  public add(scalar: number): void;
  public add(vector: Vector2D): void;
  public add(value: Vector2D | number): void {
    if (typeof value === 'number') {
      this.x += value;
      this.y += value;
    } else {
      this.x += value.x;
      this.y += value.y;
    }
  }

  public sub(scalar: number): void;
  public sub(vector: Vector2D): void;
  public sub(value: Vector2D | number): void {
    if (typeof value === 'number') {
      this.x -= value;
      this.y -= value;
    } else {
      this.x -= value.x;
      this.y -= value.y;
    }
  }

  public mult(scalar: number): void;
  public mult(vector: Vector2D): void;
  public mult(value: Vector2D | number): void {
    if (typeof value === 'number') {
      this.x *= value;
      this.y *= value;
    } else {
      this.x *= value.x;
      this.y *= value.y;
    }
  }

  public div(scalar: number): void;
  public div(vector: Vector2D): void;
  public div(value: Vector2D | number): void {
    if (typeof value === 'number') {
      if (value === 0) {
        throw new Error('Cannot divide by zero.');
      }
      this.x /= value;
      this.y /= value;
    } else {
      if (this.isZero) {
        throw new Error('Cannot divide by zero.');
      }
      this.x /= value.x;
      this.y /= value.y;
    }
  }

  public static add(vector1: Vector2D, vector2: Vector2D): Vector2D {
    return new Vector2D(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  public static sub(vector1: Vector2D, vector2: Vector2D): Vector2D {
    return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  public mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize() {
    const mag = this.mag();
    if (mag > 0) {
      this.div(mag);
    }
  }

  public limit(max: number) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
  }

  public copy(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public static random(args?: IStaticVector2DRandomArgs): Vector2D {
    const { round = true, x, y } = args || {};
    const { min: minX = 0, max: maxX = 1 } = x || {};
    const { min: minY = 0, max: maxY = 1 } = y || {};

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return new Vector2D(
      round ? Math.round(randomX) : randomX,
      round ? Math.round(randomY) : randomY
    );
  }
}
