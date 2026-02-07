import { useMemo } from 'react';

import { Mouse } from '@/common/classes';
import type { ICanvasDraw, ICanvasSetup } from '@/common/hooks';
import { Canvas } from '@/components/molecules';

import { Effect } from './sketch';

export const Galaxy = () => {
  let effect: Effect;
  const mouse = useMemo(() => new Mouse(), []);

  const setup: ICanvasSetup = (ctx) => {
    effect = new Effect(ctx);
    effect.mouse = mouse;
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
          className:
            'w-full h-full absolute top-0 left-0 overflow-hidden bg-black',
        }}
        canvasProps={{ ...mouse.eventHandlers }}
      />
      <div className="align-center pointer-events-none relative flex h-full w-full items-center justify-center bg-transparent">
        <h1 className="text-7xl uppercase text-white opacity-20 mix-blend-overlay md:text-9xl">
          Galaxy
        </h1>
      </div>
    </section>
  );
};
