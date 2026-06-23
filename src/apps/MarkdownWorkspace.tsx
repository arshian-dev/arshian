import ReactMarkdown from 'react-markdown';
import { portfolioData } from '../data/portfolio';

export default function MarkdownWorkspace() {
  return (
    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-px bg-brutal-border min-h-0">
      {/* Code Editor Viewport Pane */}
      <div className="bg-brutal-canvas p-6 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-brutal-border pb-2 text-xs font-mono text-brutal-textMuted select-none">
          <span>SOURCE // resume_raw.md</span>
          <span className="text-zinc-500">LN 1, COL 1 // UTF-8</span>
        </div>
        <textarea
          readOnly
          value={portfolioData.resumeRaw}
          className="w-full flex-1 bg-transparent font-mono text-sm text-zinc-300 focus:outline-none resize-none leading-relaxed select-text overflow-y-auto whitespace-pre-wrap selection:bg-brutal-border"
        />
      </div>

      {/* Rendered Live Preview Workspace Pane */}
      <div className="bg-brutal-surface p-6 flex flex-col h-full overflow-hidden border-t lg:border-t-0 border-brutal-border">
        <div className="flex items-center justify-between mb-3 border-b border-brutal-border pb-2 text-xs font-mono select-none">
          <span className="text-brutal-crimson">PREVIEW // compiled_output</span>
          <div className="flex items-center gap-4">
            <a href="/resume.pdf" download="Arshian_Resume.pdf" className="text-zinc-400 hover:text-zinc-100 transition-colors uppercase">
              [Download.pdf]
            </a>
            <span className="text-emerald-600 font-bold">● LIVE</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto text-sm text-zinc-300 space-y-4 max-w-none pr-2 font-sans select-text select-markdown">
          <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h1 className="text-xl font-mono font-bold text-zinc-100 tracking-wider uppercase border-b border-brutal-border pb-2 mt-2 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-mono font-bold text-zinc-200 tracking-wide uppercase mt-6 mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-mono font-bold text-brutal-crimson tracking-wide uppercase mt-6 mb-3 border-b border-[#2a2a2a] pb-1" {...props} />,
              ul: ({node, ...props}) => <ul className="list-square list-outside space-y-2 text-sm text-zinc-400 pl-4 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed marker:text-brutal-crimson" {...props} />,
              p: ({node, ...props}) => <p className="text-sm leading-relaxed text-zinc-300 mb-4" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-zinc-100" {...props} />,
              em: ({node, ...props}) => <em className="text-zinc-500 italic text-xs" {...props} />
            }}
          >
            {portfolioData.resumeRaw}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
