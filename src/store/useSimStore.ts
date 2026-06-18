import { create } from 'zustand';
import type { SelectedKind } from '../types';

interface SimState {
  speed: number; // simulated days per real second
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  selectedKind: SelectedKind;
  selectedId: string | null;
  focusRadius: number;
  resetSignal: number;

  setSpeed: (v: number) => void;
  setPaused: (v: boolean) => void;
  togglePause: () => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  select: (kind: SelectedKind, id: string, focusRadius: number) => void;
  deselect: () => void;
  resetView: () => void;
}

export const useSimStore = create<SimState>((set) => ({
  speed: 5,
  paused: false,
  showOrbits: true,
  showLabels: true,
  selectedKind: null,
  selectedId: null,
  focusRadius: 110,
  resetSignal: 0,

  setSpeed: (v) => set({ speed: v }),
  setPaused: (v) => set({ paused: v }),
  togglePause: () => set((s) => ({ paused: !s.paused })),
  toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  select: (kind, id, focusRadius) =>
    set({ selectedKind: kind, selectedId: id, focusRadius }),
  deselect: () => set({ selectedKind: null, selectedId: null }),
  resetView: () =>
    set((s) => ({
      selectedKind: null,
      selectedId: null,
      resetSignal: s.resetSignal + 1,
    })),
}));
