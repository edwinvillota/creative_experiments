import { FC, ReactNode } from 'react';

import { useColorSchemeContext } from '@/common/contexts/ColorScheme';
import { useDragAndDrop } from '@/common/hooks/useDragAndDrop';
import { classnames } from '@/common/utils';

const DRAG_STATE_CLASSES: Record<
  ReturnType<typeof useDragAndDrop>['status'],
  string
> = {
  idle: 'bg-gray-100 ',
  dragging: 'bg-gray-200',
  loading: 'bg-gray-200 animate-pulse',
  loaded: '',
} as const;

const DRAG_AND_DROP_PLACEHOLDER: Record<
  Exclude<ReturnType<typeof useDragAndDrop>['status'], 'loaded'>,
  ReactNode
> = {
  idle: (
    <span className="text-lg font-medium text-gray-500">
      Drag and drop your image here.
    </span>
  ),
  dragging: (
    <span className="animate-pulse text-lg font-semibold text-gray-500">
      Drop your image here.
    </span>
  ),
  loading: (
    <div className="flex flex-col items-center gap-2">
      <span className="text-lg font-semibold text-gray-500">Loading ...</span>
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-spin rounded-full"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-gray-500"></span>
      </span>
    </div>
  ),
};

interface IReactDragAndDropProps {}

export const ReactDragAndDrop: FC<IReactDragAndDropProps> = () => {
  const { status, handlers, base64 } = useDragAndDrop();
  const { updateBase64Image, isLoadingPallete } = useColorSchemeContext();

  const handleOnLoadImage = () => {
    updateBase64Image(base64);
  };

  return (
    <>
      <div
        className={classnames(
          'boder-2 relative flex aspect-video w-full items-center justify-center overflow-hidden',
          DRAG_STATE_CLASSES[status],
          [
            isLoadingPallete,
            "before:absolute before:left-0 before:top-0 before:z-10 before:flex before:h-full before:w-full before:animate-pulse before:bg-gray-800/50 before:blur-sm before:content-[''] after:absolute after:left-0 after:top-0 after:z-20 after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:content-['Loading...']",
          ]
        )}
        {...handlers}
      >
        {status === 'loaded' ? (
          <img
            src={base64 as string}
            className="expand-circle-animation"
            onLoad={handleOnLoadImage}
          />
        ) : (
          DRAG_AND_DROP_PLACEHOLDER[status]
        )}
      </div>
    </>
  );
};
