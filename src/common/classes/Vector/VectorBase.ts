export interface IVector<TVectorType> {
  add(vector: TVectorType | number): void;
  sub(vector: TVectorType | number): void;
  mult(vector: TVectorType | number): void;
  div(vector: TVectorType | number): void;
}

export class VectorBase {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
