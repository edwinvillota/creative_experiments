import { MouseEvent } from 'react';

import { Vector2D } from '..';

interface IMouseEventHandlers {
  onMouseMove: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseEnter: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseDown: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (event: MouseEvent<HTMLCanvasElement>) => void;
}

export class Mouse implements IMouseEventHandlers {
  public position: Vector2D;
  public isPressed: boolean = false;
  public isMouseOver: boolean = false;
  public eventHandlers!: IMouseEventHandlers;

  constructor() {
    this.position = new Vector2D(0, 0);
    this.isPressed = false;
    this.isMouseOver = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.eventHandlers = {
      onMouseMove: this.onMouseMove,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
    };
  }

  public setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }

  public onMouseEnter() {
    this.isMouseOver = true;
  }

  public onMouseLeave() {
    this.isMouseOver = false;
  }

  public onMouseDown() {
    this.isPressed = true;
  }

  public onMouseUp() {
    this.isPressed = false;
  }

  public onMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    this.setPosition(event.clientX, event.clientY);
  }
}
