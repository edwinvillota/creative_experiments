import { create } from 'zustand';

import { createSelectors } from './createSelectors';

export type TMenuState = {
  isOpen: boolean;
  toggle: () => void;
};

export type TMenuActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useMenuStoreBase = create<TMenuState & TMenuActions>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useMenuStore = createSelectors(useMenuStoreBase);
