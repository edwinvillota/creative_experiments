import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Provider, TPallete } from './ColorSchemeContext.ts';

export const ColorSchemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoadingPallete, setIsLoadingPallete] = useState(false);
  const [pallete, setPallete] = useState<TPallete>([]);

  const extractPalleteWorker: Worker = useMemo(
    () =>
      new Worker(
        new URL('../../workers/extractColors.worker.ts', import.meta.url),
        { type: 'module' }
      ),
    []
  );

  const updateBase64Image = useCallback(
    async (base64Image: string | ArrayBuffer | null) => {
      if (typeof base64Image === 'string') {
        setIsLoadingPallete(true);
        extractPalleteWorker.postMessage(base64Image);
      }
    },
    [extractPalleteWorker]
  );

  useEffect(() => {
    if (window.Worker && isLoadingPallete) {
      extractPalleteWorker.onmessage = (e: MessageEvent<TPallete>) => {
        setIsLoadingPallete(false);
        setPallete(e.data);
      };
    }
  }, [extractPalleteWorker, isLoadingPallete]);

  return (
    <Provider
      value={{
        pallete: pallete,
        isLoadingPallete,
        updateBase64Image,
      }}
    >
      {children}
    </Provider>
  );
};
