import { useState, useEffect, type ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';

interface WindowFrameProps {
  id: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function WindowFrame({ id, title, actions, children }: WindowFrameProps) {
  const { windows, updateWindowBounds, bringToFront, closeWindow, toggleMaximize } = useSystemStore();
  const windowState = windows[id];

  const [isMounted, setIsMounted] = useState(windowState?.isOpen || false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (windowState?.isOpen) {
      setIsMounted(true);
    } else if (isMounted) {
      const t = setTimeout(() => setIsMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [windowState?.isOpen, isMounted]);

  if (!isMounted || !windowState) return null;

  return (
    <Rnd
      size={{ width: windowState.width, height: windowState.height }}
      position={{ x: windowState.x, y: windowState.y }}
      onDragStart={() => setIsInteracting(true)}
      onDragStop={(_e, d) => {
        setIsInteracting(false);
        updateWindowBounds(id, { x: d.x, y: d.y });
      }}
      onResizeStart={() => setIsInteracting(true)}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setIsInteracting(false);
        updateWindowBounds(id, {
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      disableDragging={windowState.isMaximized}
      enableResizing={!windowState.isMaximized}
      dragHandleClassName="drag-handle"
      cancel=".drag-cancel"
      style={{ display: 'flex', zIndex: windowState.zIndex, position: 'absolute' }}
      onMouseDown={() => bringToFront(id)}
      className={`absolute ${!isInteracting ? 'transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: windowState.isOpen ? 1 : 0, scale: windowState.isOpen ? 1 : 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`flex flex-col h-full w-full bg-brutal-surface border shadow-2xl overflow-hidden ${windowState.isMaximized ? 'border-transparent' : 'border-brutal-border'}`}
      >
        {/* Window Titlebar Header */}
        <div className="drag-handle cursor-move flex items-center justify-between bg-[#1f1f1f] border-b border-brutal-border px-4 py-2 font-mono text-xs select-none hover:bg-[#252525] transition-colors shrink-0">
          <div className="flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 bg-brutal-crimson inline-block"></span>
            <span className="font-semibold tracking-wide text-zinc-300">{title}</span>
          </div>
          <div className="flex items-center gap-4 text-brutal-textMuted drag-cancel cursor-default">
            {actions && <div className="mr-2 flex items-center">{actions}</div>}
            <div className="flex items-center gap-2 font-sans">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => closeWindow(id)}>[-]</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => toggleMaximize(id)}>[⤢]</span>
              <span className="hover:text-brutal-crimson transition-colors cursor-pointer" onClick={() => closeWindow(id)}>[X]</span>
            </div>
          </div>
        </div>
        
        {/* Main Application Inner Area */}
        <div className="flex-1 overflow-hidden drag-cancel cursor-default bg-black flex flex-col min-h-0 relative">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
