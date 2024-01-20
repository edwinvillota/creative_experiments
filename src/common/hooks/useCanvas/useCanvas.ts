import { useEffect, useRef } from 'react';

export interface ICanvasSetup {
  (context: CanvasRenderingContext2D): void;
}

export interface ICanvasDraw {
  (context: CanvasRenderingContext2D, frameCount?: number): void;
}

export interface IUseCanvasProps {
  animated?: boolean;
  setup?: ICanvasSetup;
  draw?: ICanvasDraw;
}

export const useCanvas = ({
  animated = false,
  setup,
  draw,
}: IUseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!setup) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context && canvas) {
      ctx.current = context;
      setup(context);
    }
  }, [setup]);

  useEffect(() => {
    if (!draw) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      draw(ctx!, frameCount);
      if (animated) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animated, draw]);

  return [canvasRef, ctx] as const;
};
