import { create } from 'zustand';

type AppState = {
  pendingCount: number;
  globalLoading: boolean;
  beginRequest: () => void;
  endRequest: () => void;
  resetLoading: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  pendingCount: 0,
  globalLoading: false,
  beginRequest: () => {
    const n = get().pendingCount + 1;
    set({ pendingCount: n, globalLoading: n > 0 });
  },
  endRequest: () => {
    const n = Math.max(0, get().pendingCount - 1);
    set({ pendingCount: n, globalLoading: n > 0 });
  },
  resetLoading: () => set({ pendingCount: 0, globalLoading: false }),
}));
