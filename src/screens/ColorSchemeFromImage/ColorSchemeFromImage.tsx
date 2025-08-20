import { useEffect, useState } from 'react';

import { useColorSchemeContext } from '@/common/contexts/ColorScheme';
import { classnames } from '@/common/utils';
import { ReactDragAndDrop } from '@/components/organisms/ReactDragAndDrop';

export const ColorSchemeFromImage = () => {
  const [resized, setResized] = useState(false);
  const { isLoadingPallete, pallete } = useColorSchemeContext();

  useEffect(() => {
    if (pallete) {
      document.startViewTransition(() => {
        setResized(pallete.length > 0);
      });
    }
  }, [pallete]);

  return (
    <section className="container mx-auto flex flex-col gap-8 py-4">
      <h1>ColorSchemeFromImage</h1>
      <div
        className={classnames(
          `image-wrapper-transition z-10 flex h-[400px] flex-col justify-center gap-8 overflow-hidden`,
          [resized, 'absolute left-0 top-0']
        )}
        style={{
          viewTransitionName: 'image-wrapper',
        }}
      >
        <ReactDragAndDrop />
      </div>
      <div
        className={classnames(
          'pallete-wrapper-transition z-0 flex',
          [isLoadingPallete, 'animate-pulse'],
          [pallete.length === 0, 'h-14 bg-gray-100'],
          [resized, 'mt-[360px]']
        )}
        style={{
          viewTransitionName: 'pallete-wrapper',
        }}
      >
        {!isLoadingPallete &&
          pallete?.map(({ r, g, b }, i) => (
            <div
              key={`${r}-${g}-${b}/${i}`}
              className={classnames('flex aspect-square w-40')}
              style={{
                backgroundColor: `rgb(${r},${g},${b})`,
              }}
            />
          ))}
      </div>
    </section>
  );
};
