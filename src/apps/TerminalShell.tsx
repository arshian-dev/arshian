import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useSystemStore } from '../store/useSystemStore';


interface LogLine {
  text: string;
  type: 'system' | 'command' | 'output' | 'error' | 'success';
  link?: string;
  copyText?: string;
}

const HELP_LINES: LogLine[] = [
  { text: "AVAILABLE UTILITIES:", type: 'success' },
  { text: "  about       - Initialization summary & engineering philosophy", type: 'output' },
  { text: "  resume      - Load interactive split-pane resume editor", type: 'output' },
  { text: "  projects    - Mount project file index & specifications", type: 'output' },
  { text: "  run         - List or launch deployed project executables", type: 'output' },
  { text: "  contact     - Display secure communication links & social vectors", type: 'output' },
  { text: "  clear       - Wipe log array clean", type: 'output' }
];

const BOOT_SEQUENCE: LogLine[] = [
  { text: "ARSHIAN_OS [Version 2.2.6]", type: 'system' },
  { text: "LOCAL_HOST: 127.0.0.1 // PERSISTENCE: STATUS_OK", type: 'system' },
  { text: "--------------------------------------------------", type: 'system' },
  { text: "Welcome. Enter a command below to explore the kernel environment.", type: 'output' },
  { text: "Type 'help' at any time to see the complete systems directory.", type: 'output' },
  { text: "", type: 'output' },
  ...HELP_LINES,
  { text: "--------------------------------------------------", type: 'system' },
];

const DEPLOYED_APPS: Record<string, string> = {
  stix: 'https://stix-kappa.vercel.app/',
  fitnessbuddy: 'https://fitnessbuddy-frontend.vercel.app/',
  pitwall: 'https://pitwall-pro-seven.vercel.app/',
  lumina: 'https://arshian-dev.github.io/lumina/',
};

export default function TerminalShell() {
  const { isBooting, completeBoot, openWindow, bringToFront } = useSystemStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogLine[]>(isBooting ? [] : BOOT_SEQUENCE);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus the input box whenever they click anywhere inside the terminal frame
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isBooting) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        const itemToAdd = BOOT_SEQUENCE[currentIndex];
        setHistory(prev => [...prev, itemToAdd]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          completeBoot();
        }, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isBooting, completeBoot]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);



  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();
    if (!cleanInput) return;

    // 1. Add their typed command to the running history window buffer
    const newLines: LogLine[] = [{ text: `guest@arshian:~$ ${input}`, type: 'command' }];

    // 2. Command Router Parser Execution
    const args = cleanInput.split(' ');
    const command = args[0];

    switch (command) {
      case 'help':
        newLines.push(...HELP_LINES);
        break;

      case 'about':
        newLines.push(
          { text: "ARSHIAN ALI // Full-Stack Software Engineer & AI Specialist", type: 'success' },
          { text: "-----------------------------------------------------------", type: 'system' },
          { text: "Focus: Artificial Intelligence, local-first system architectures, and intelligent web applications.", type: 'output' },
          { text: "Currently: Full-Stack Intern at Coding The Brains, building real-time CV pipelines and multi-tier apps.", type: 'output' },
          { text: "Philosophy: Engineering complex platforms with absolute optimization, robust data pipelines, and zero bloated container overhead.", type: 'output' }
        );
        break;

      case 'resume':
        newLines.push({ text: "ROUTE EXTENSION DISPATCHED // LOADING WORKSPACE...", type: 'success' });
        openWindow('resume');
        bringToFront('resume');
        break;

      case 'projects':
        newLines.push({ text: "MOUNTING ARCHIVE LAYER // OPENING EXPLORER...", type: 'success' });
        openWindow('projects');
        bringToFront('projects');
        break;

      case 'run':
        const targetApp = args[1];
        if (!targetApp) {
          newLines.push({ text: "EXECUTABLES AVAILABLE FOR RUNTIME:", type: 'success' });
          Object.keys(DEPLOYED_APPS).forEach(appName => {
            newLines.push({ text: `  ${appName}`, type: 'output' });
          });
          newLines.push({ text: "Usage: run [app_name]", type: 'system' });
        } else if (DEPLOYED_APPS[targetApp]) {
          newLines.push({ text: `LAUNCHING ${targetApp.toUpperCase()}_KERNEL IN SEPARATE INSTANCE...`, type: 'success' });
          window.open(DEPLOYED_APPS[targetApp], '_blank', 'noopener,noreferrer');
        } else {
          newLines.push({ text: `error: executable '${targetApp}' not found or not deployed. Type 'run' to see available apps.`, type: 'error' });
        }
        break;

      case 'contact':
        newLines.push(
          { text: "ESTABLISHING SECURE HANDSHAKE...", type: 'system' },
          { text: "EMAIL:    arshian.ali.dev@gmail.com", type: 'output', copyText: "arshian.ali.dev@gmail.com" },
          { text: "GITHUB:   https://github.com/arshian-dev", type: 'output', link: "https://github.com/arshian-dev" },
          { text: "LINKEDIN: https://linkedin.com/in/arshian-ali-5527352a7", type: 'output', link: "https://www.linkedin.com/in/arshian-ali-5527352a7/" }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        newLines.push({ 
          text: "[ACCESS DENIED] guest is not in the sudoers file. This incident has been flagged and transmitted to engineering leadership.", 
          type: 'error' 
        });
        break;

      case 'cat':
        const targetFile = args[1];
        if (!targetFile) {
          newLines.push({ text: "error: syntax layout check failed. usage: cat [filename]", type: 'error' });
        } else if (targetFile === 'stix.app' || targetFile === 'stix') {
          newLines.push({ text: "File: stix.app -> Type 'run stix' to launch full app process interface.", type: 'output' });
        } else if (targetFile === 'pitwall_telemetry' || targetFile === 'pitwall') {
          newLines.push({ text: "File: pitwall_telemetry -> Custom C++ Adjacency List engine. ZERO-STL constraints.", type: 'output' });
        } else {
          newLines.push({ text: `error: file terminal node descriptor matching '${targetFile}' failed`, type: 'error' });
        }
        break;

      default:
        newLines.push({ text: `command not recognized: '${command}'. Type 'help' for directions.`, type: 'error' });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div 
      onClick={handleTerminalClick}
      className="flex-1 w-full bg-black font-mono text-xs md:text-sm p-4 flex flex-col justify-between select-text cursor-text min-h-0"
    >
      {/* Scrollable Logging Terminal Window Frame Grid */}
      <div ref={containerRef} className="space-y-1.5 overflow-y-auto flex-1 pr-2 leading-relaxed">
        {history.map((line, idx) => {
          let colorClass = 'text-zinc-300';
          if (line.type === 'system') colorClass = 'text-zinc-600';
          if (line.type === 'command') colorClass = 'text-zinc-100 font-bold';
          if (line.type === 'success') colorClass = 'text-emerald-500 font-semibold';
          if (line.type === 'error') colorClass = 'text-brutal-crimson font-bold';

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
              {line.link ? (
                <a href={line.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors cursor-pointer">
                  {line.text}
                </a>
              ) : line.copyText ? (
                <span 
                  onClick={() => navigator.clipboard.writeText(line.copyText!)}
                  className="hover:underline hover:text-white transition-colors cursor-pointer"
                  title="Click to copy to clipboard"
                >
                  {line.text}
                </span>
              ) : (
                line.text
              )}
            </div>
          );
        })}
      </div>

      {/* Live Input Field Line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-4 border-t border-[#1a1a1a] pt-3">
        <span className="text-zinc-100 font-bold shrink-0">guest@arshian:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isBooting}
          className="flex-1 bg-transparent text-zinc-100 focus:outline-none caret-brutal-crimson selection:bg-brutal-border font-mono p-0 m-0 border-0 disabled:opacity-50"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
