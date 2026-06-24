import { useState, useEffect } from 'react';
import TerminalShell from '../apps/TerminalShell';
import MarkdownWorkspace from '../apps/MarkdownWorkspace';
import FileExplorer from '../apps/FileExplorer';
import AboutWindow from '../apps/AboutWindow';
import { useSystemStore } from '../store/useSystemStore';

type AppId = 'terminal' | 'about' | 'resume' | 'projects' | null;

export default function MobileLayout() {
  const [activeApp, setActiveApp] = useState<AppId>(null);
  const { completeBoot } = useSystemStore();

  useEffect(() => {
    // Instantly skip boot sequence for mobile users to prevent black screen
    completeBoot();
  }, [completeBoot]);

  return (
    <div className="flex flex-col h-[100dvh] w-[100dvw] bg-brutal-canvas overflow-hidden relative selection:bg-brutal-crimson selection:text-white">
      {/* Mobile Header */}
      <header className="shrink-0 border-b border-brutal-border p-4 font-mono select-none flex flex-col gap-2 bg-[#0a0a0a] z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-xs font-bold text-zinc-100 tracking-tight">ARSHIAN ALI // KERNEL</h1>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <p className="text-brutal-textMuted">SYS_REV: 2026.06</p>
          <p className="text-emerald-500 font-bold">● ACTIVE</p>
        </div>
        {activeApp !== null && (
          <div className="mt-2 pt-2 border-t border-[#1a1a1a]">
            <button 
              onClick={() => setActiveApp(null)}
              className="w-full py-2 bg-[#161616] border border-brutal-border text-xs font-bold text-brutal-crimson hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
            >
              <span>←</span> RETURN TO MENU
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col bg-black">
          {activeApp === null && (
            <div className="flex-1 p-6 flex flex-col gap-4 items-center justify-center font-mono">
              <button 
                onClick={() => setActiveApp('terminal')}
                className="w-full max-w-[300px] border border-brutal-border bg-[#111] hover:bg-[#1a1a1a] transition-all p-6 flex flex-col items-center gap-3 group"
              >
                <div className="text-4xl text-zinc-500 group-hover:text-brutal-crimson transition-colors">{'_>'}</div>
                <div className="text-sm text-zinc-200 tracking-wider">sys_init_shell.sh</div>
                <div className="text-[10px] text-zinc-600">TERMINAL CORE</div>
              </button>

              <button 
                onClick={() => setActiveApp('resume')}
                className="w-full max-w-[300px] border border-brutal-border bg-[#111] hover:bg-[#1a1a1a] transition-all p-6 flex flex-col items-center gap-3 group"
              >
                <div className="text-4xl text-zinc-500 group-hover:text-brutal-crimson transition-colors">📄</div>
                <div className="text-sm text-zinc-200 tracking-wider">resume_workspace.app</div>
                <div className="text-[10px] text-zinc-600">MARKDOWN VIEWER</div>
              </button>

              <button 
                onClick={() => setActiveApp('about')}
                className="w-full max-w-[300px] border border-brutal-border bg-[#111] hover:bg-[#1a1a1a] transition-all p-6 flex flex-col items-center gap-3 group"
              >
                <div className="text-4xl text-zinc-500 group-hover:text-brutal-crimson transition-colors">👤</div>
                <div className="text-sm text-zinc-200 tracking-wider">device_info.exe</div>
                <div className="text-[10px] text-zinc-600">SYSTEM PROFILER</div>
              </button>

              <button 
                onClick={() => setActiveApp('projects')}
                className="w-full max-w-[300px] border border-brutal-border bg-[#111] hover:bg-[#1a1a1a] transition-all p-6 flex flex-col items-center gap-3 group"
              >
                <div className="text-4xl text-zinc-500 group-hover:text-brutal-crimson transition-colors">📁</div>
                <div className="text-sm text-zinc-200 tracking-wider">file_explorer.exe</div>
                <div className="text-[10px] text-zinc-600">PROJECT DIRECTORY</div>
              </button>

              <div className="mt-8 text-[10px] text-zinc-600 text-center px-4 max-w-[300px] border-t border-[#1a1a1a] pt-4">
                Note: This OS environment is best experienced on a laptop or desktop computer.
              </div>
            </div>
          )}

          {activeApp === 'terminal' && <TerminalShell />}
          {activeApp === 'about' && <AboutWindow />}
          {activeApp === 'resume' && <MarkdownWorkspace />}
          {activeApp === 'projects' && <FileExplorer />}
        </div>
      </div>
    </div>
  );
}
