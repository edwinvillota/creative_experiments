import { useMemo } from 'react';

import { Mouse } from '@/common/classes';
import { Canvas } from '@/components/molecules';

import { Effect } from './sketch';

export const Lines = () => {
  let effect: Effect;
  const mouse = useMemo(() => new Mouse(), []);

  const setup = (ctx: CanvasRenderingContext2D) => {
    effect = new Effect(ctx);
    effect.init();
  };

  const draw = () => {
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
    </section>
  );
};
