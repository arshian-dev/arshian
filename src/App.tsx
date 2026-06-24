import WindowFrame from './components/WindowFrame';
import TerminalShell from './apps/TerminalShell';
import MarkdownWorkspace from './apps/MarkdownWorkspace';
import FileExplorer from './apps/FileExplorer';
import AboutWindow from './apps/AboutWindow';
import { useSystemStore } from './store/useSystemStore';
import MobileLayout from './components/MobileLayout';
import { useIsMobile } from './hooks/useIsMobile';

export default function App() {
  const { isBooting } = useSystemStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <main className={`bg-brutal-canvas w-screen h-screen overflow-hidden relative selection:bg-brutal-crimson selection:text-white ${isBooting ? 'scanlines animate-boot-glow' : ''}`}>
      {/* Header Info Banner Utilities */}
      <header className={`absolute top-4 left-6 right-6 z-0 border-b border-brutal-border pb-4 font-mono text-xs select-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-opacity duration-1000 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <h1 className="text-sm font-bold text-zinc-100 tracking-tight">ARSHIAN ALI // PORTFOLIO_KERNEL</h1>
          <p className="text-brutal-textMuted text-[10px] mt-0.5">LOCAL_ADDR: 127.0.0.1 // STATUS: ACTIVE</p>
        </div>
        <div className="text-right text-[10px] text-zinc-500">
          SYS_REV: 2026.06 // BUILD_STABLE
        </div>
      </header>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          <WindowFrame id="terminal" title="sys_init_shell.sh">
            <TerminalShell />
          </WindowFrame>

          <WindowFrame id="about" title="device_info.exe">
            <AboutWindow />
          </WindowFrame>

          <WindowFrame id="resume" title="resume_workspace.app">
            <MarkdownWorkspace />
          </WindowFrame>

          <WindowFrame id="projects" title="file_explorer.exe">
            <FileExplorer />
          </WindowFrame>
        </div>
      </div>

      {/* Footer Navigation Chrome */}
      <footer className={`absolute bottom-4 left-6 right-6 z-0 border-t border-brutal-border pt-4 font-mono text-[10px] text-zinc-600 flex justify-between items-center select-none transition-opacity duration-1000 delay-500 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
        <div>© 2026 ARSHIAN ALI. ALL RIGHTS RESERVED.</div>
        <div className="text-brutal-crimson font-bold">EOF // PROCESS_TERMINATED</div>
      </footer>
    </main>
  );
}
