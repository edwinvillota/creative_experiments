import { MouseEventHandler, useRef } from 'react';

import { Vector2D } from '@/common/classes';
import type { ICanvasDraw, ICanvasSetup } from '@/common/hooks';
import { Canvas } from '@/components/molecules';

import { Effect } from './sketch';

export const Canvas2DExample = () => {
  let effect: Effect;
  const mouseRef = useRef<Vector2D>(new Vector2D(0, 0));

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };

  const setup: ICanvasSetup = (ctx) => {
    effect = new Effect(ctx);
    effect.mouse = mouseRef.current;
    effect.init();
  };

  const draw: ICanvasDraw = () => {
    effect.render();
  };

  return (
    <section className="relative h-full w-full">
      <Canvas
        sketch={{
          animated: true,
          setup,
          draw,
        }}
        containerProps={{
          className: 'w-full h-full absolute top-0 left-0 blur-md',
        }}
        canvasProps={{
          onMouseMove: handleMouseMove,
          onMouseLeave: () => {
            effect.mouse = new Vector2D(-1000, -1000);
          },
          onMouseEnter: () => {
            effect.mouse = mouseRef.current;
          },
        }}
      />
      <div className="align-center pointer-events-none relative flex h-full w-full items-center justify-center bg-transparent">
        <h1 className="text-7xl font-black uppercase text-black md:text-9xl">
          Creative
        </h1>
      </div>
    </section>
  );
};
