import { useLayoutEffect, useRef } from 'react';

export function useResizeObserver<TTarget extends HTMLElement>(
  callback: (target: TTarget, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<TTarget>(null);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [callback, ref]);

  return ref;
}
