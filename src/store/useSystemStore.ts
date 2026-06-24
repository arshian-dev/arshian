import { create } from 'zustand';

export interface WindowState {
  id: string;
  isOpen: boolean;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  zIndex: number;
  isMaximized?: boolean;
  preMaximizedBounds?: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>;
}

interface SystemState {
  isBooting: boolean;
  windows: Record<string, WindowState>;
  highestZIndex: number;
  completeBoot: () => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  updateWindowBounds: (id: string, bounds: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => void;
  bringToFront: (id: string) => void;
  toggleMaximize: (id: string) => void;
}

const getCenter = (width: number, height: number, offset = 0) => {
  if (typeof window === 'undefined') return { x: 50 + offset, y: 50 + offset };
  return {
    x: Math.max(0, (window.innerWidth - width) / 2) + offset,
    y: Math.max(0, (window.innerHeight - height) / 2) + offset,
  };
};

const DEFAULT_WINDOWS: Record<string, WindowState> = {
  about: { id: 'about', isOpen: false, ...getCenter(750, 550, 10), width: 750, height: 550, zIndex: 10 },
  terminal: { id: 'terminal', isOpen: true, ...getCenter(700, 480), width: 700, height: 480, zIndex: 11 },
  resume: { id: 'resume', isOpen: false, ...getCenter(1000, 700, 20), width: 1000, height: 700, zIndex: 12 },
  projects: { id: 'projects', isOpen: false, ...getCenter(1000, 700, 40), width: 1000, height: 700, zIndex: 13 },
};

export const useSystemStore = create<SystemState>((set, get) => ({
  isBooting: true,
  windows: DEFAULT_WINDOWS,
  highestZIndex: 20,
  
  completeBoot: () => set({ isBooting: false }),
  
  openWindow: (id) => set((state) => {
    const newZ = state.highestZIndex + 1;
    return {
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, zIndex: newZ }
      }
    };
  }),
  
  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    }
  })),

  updateWindowBounds: (id, bounds) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], ...bounds }
    }
  })),

  bringToFront: (id) => {
    const state = get();
    if (!state.windows[id]) return;
    if (state.windows[id].zIndex === state.highestZIndex) return; // already on top
    const newZ = state.highestZIndex + 1;
    set({
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZ }
      }
    });
  },

  toggleMaximize: (id) => set((state) => {
    const win = state.windows[id];
    if (!win) return state;

    if (win.isMaximized) {
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...win,
            isMaximized: false,
            x: win.preMaximizedBounds?.x ?? win.x,
            y: win.preMaximizedBounds?.y ?? win.y,
            width: win.preMaximizedBounds?.width ?? win.width,
            height: win.preMaximizedBounds?.height ?? win.height,
          }
        }
      };
    } else {
      const newZ = state.highestZIndex + 1;
      return {
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: {
            ...win,
            isMaximized: true,
            zIndex: newZ,
            preMaximizedBounds: { x: win.x, y: win.y, width: win.width, height: win.height },
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
          }
        }
      };
    }
  })
}));
