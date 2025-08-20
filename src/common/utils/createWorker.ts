export const createWorker = <TData>(
  url: string,
  callback: (data: TData) => void
): Worker => {
  const worker = new Worker(new URL(url, import.meta.url), { type: 'module' });

  worker.onmessage = (event: MessageEvent<TData>) => callback(event.data);
  return worker;
};
