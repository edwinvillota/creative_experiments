import { Canvas } from '@/components/molecules';

import { Effect } from './sketch';

export const Galaxy = () => {
  let effect: Effect;

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
          animated: false,
          setup,
          draw,
        }}
        containerProps={{
          className:
            'w-full h-full absolute top-0 left-0 overflow-hidden bg-black',
        }}
      />
    </section>
  );
};
