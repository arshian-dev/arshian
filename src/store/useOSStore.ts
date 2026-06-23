import { create } from 'zustand';

export type ProcessId = 'terminal' | 'explorer' | 'editor' | string;

export interface ProcessState {
  id: ProcessId;
  isOpen: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface OSState {
  processes: Record<ProcessId, ProcessState>;
  activeProcessId: ProcessId | null;
  maxZIndex: number;
  editorTargetFile: string | null;
  open: (id: ProcessId) => void;
  close: (id: ProcessId) => void;
  minimize: (id: ProcessId) => void;
  focus: (id: ProcessId) => void;
  updatePosition: (id: ProcessId, x: number, y: number) => void;
  setEditorTargetFile: (file: string | null) => void;
}

export const useOSStore = create<OSState>((set) => ({
  processes: {
    terminal: { id: 'terminal', isOpen: true, isMinimized: false, x: 50, y: 50, width: 600, height: 400, zIndex: 1 },
    explorer: { id: 'explorer', isOpen: false, isMinimized: false, x: 100, y: 100, width: 700, height: 500, zIndex: 2 },
    editor: { id: 'editor', isOpen: false, isMinimized: false, x: 150, y: 150, width: 800, height: 600, zIndex: 3 },
  },
  activeProcessId: 'terminal',
  maxZIndex: 3,
  editorTargetFile: null,

  open: (id) =>
    set((state) => {
      const newZIndex = state.maxZIndex + 1;
      return {
        processes: {
          ...state.processes,
          [id]: {
            ...state.processes[id],
            isOpen: true,
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
        activeProcessId: id,
        maxZIndex: newZIndex,
      };
    }),

  close: (id) =>
    set((state) => ({
      processes: {
        ...state.processes,
        [id]: { ...state.processes[id], isOpen: false },
      },
      activeProcessId: state.activeProcessId === id ? null : state.activeProcessId,
    })),

  minimize: (id) =>
    set((state) => ({
      processes: {
        ...state.processes,
        [id]: { ...state.processes[id], isMinimized: true },
      },
      activeProcessId: state.activeProcessId === id ? null : state.activeProcessId,
    })),

  focus: (id) =>
    set((state) => {
      if (state.activeProcessId === id && state.processes[id].zIndex === state.maxZIndex) {
        return {}; // Already focused
      }
      const newZIndex = state.maxZIndex + 1;
      return {
        processes: {
          ...state.processes,
          [id]: {
            ...state.processes[id],
            zIndex: newZIndex,
            isMinimized: false,
          },
        },
        activeProcessId: id,
        maxZIndex: newZIndex,
      };
    }),

  updatePosition: (id, x, y) =>
    set((state) => ({
      processes: {
        ...state.processes,
        [id]: { ...state.processes[id], x, y },
      },
    })),
    
  setEditorTargetFile: (file) => set({ editorTargetFile: file }),
}));
