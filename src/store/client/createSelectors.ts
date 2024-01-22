import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<TSelector> = TSelector extends { getState: () => infer T }
  ? TSelector & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <
  TSelector extends UseBoundStore<StoreApi<object>>,
>(
  _store: TSelector
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
