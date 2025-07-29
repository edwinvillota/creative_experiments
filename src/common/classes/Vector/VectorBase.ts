export interface IStaticVector2DRandomArgs {
  round?: boolean;
  x?: {
    min?: number;
    max?: number;
  };
  y?: {
    min?: number;
    max?: number;
  };
}
export interface IVector<TVectorType> {
  add(vector: TVectorType | number): void;
  sub(vector: TVectorType | number): void;
  mult(vector: TVectorType | number): void;
  div(vector: TVectorType | number): void;
}

abstract class VectorStaticBase {
  public static random(args?: IStaticVector2DRandomArgs): VectorBase {
    throw new Error('Method not implemented.');
  }
}

export class VectorBase extends VectorStaticBase {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}
