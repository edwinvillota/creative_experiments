import { DragEvent, useCallback, useMemo, useState } from 'react';

type UseDragAndDropStatus = 'idle' | 'dragging' | 'loading' | 'loaded';

const getFileData = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onload = function () {
      resolve(this.result);
    };

    fileReader.readAsDataURL(file);
  });

export function useDragAndDrop<TElement extends Element>() {
  const [base64, setBase64] = useState<string | ArrayBuffer | null>('');
  const [status, setStatus] = useState<UseDragAndDropStatus>('idle');

  const reset = useCallback(() => {
    setStatus('idle');
    setBase64(null);
  }, []);

  const handleDragStart = (e: DragEvent<TElement>) => {
    e.preventDefault();
    setStatus('dragging');
  };
  const handleDragOver = (e: DragEvent<TElement>) => {
    e.preventDefault();
    setStatus('dragging');
  };
  const handleDragLeave = () => setStatus('idle');

  const handleDrop = async (e: DragEvent<TElement>) => {
    e.preventDefault();
    setStatus('loading');

    if (!e.dataTransfer) {
      return;
    }

    const files = e.dataTransfer.files;

    if (!files[0]) {
      return;
    }

    const image = files[0];

    if (image.type.split('/')[0] !== 'image') {
      return;
    }

    const dataUrl = await getFileData(image);

    setBase64(dataUrl);

    setStatus('loaded');
  };

  const handlers = useMemo(() => {
    return {
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    return {
      base64,
      status,
      reset,
      handlers,
    } as const;
  }, [base64, handlers, reset, status]);
}
