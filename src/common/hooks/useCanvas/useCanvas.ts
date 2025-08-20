import { useEffect, useRef } from 'react';

export interface ICanvasSetup {
  (context: CanvasRenderingContext2D): void;
}

export interface ICanvasDraw {
  (context: CanvasRenderingContext2D): void;
}

export interface IUseCanvasProps {
  animated?: boolean;
  clear?: boolean;
  setup?: ICanvasSetup;
  draw?: ICanvasDraw;
}

export const useCanvas = ({
  animated = false,
  clear = true,
  setup,
  draw,
}: IUseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', {
      willReadFrequently: true,
    });

    if (context && canvas) {
      ctx.current = context;
      setup && setup(context);
      draw && draw(context);
    }
  }, [draw, setup]);

  useEffect(() => {
    if (!draw) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', {
      willReadFrequently: true,
    });

    let animationFrameId: number;
    let msPrev = window.performance.now();
    const fps = 60;
    const msPerFrame = 1000 / fps;

    const render = () => {
      if (animated) {
        animationFrameId = window.requestAnimationFrame(render);
        const msNow = window.performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed < msPerFrame) return;

        const excessTime = msPassed % msPerFrame;
        msPrev = msNow - excessTime;
        if (clear) ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        draw(ctx!);
      }
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [animated, clear, draw]);

  return [canvasRef, ctx] as const;
};
