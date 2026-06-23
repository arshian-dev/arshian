import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data/portfolio';

export default function FileExplorer() {
  const [selectedProject, setSelectedProject] = useState<Project>(portfolioData.projects[0]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex-1 w-full flex flex-col lg:grid lg:grid-cols-12 bg-brutal-border min-h-0 relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden p-3 border-b border-brutal-border bg-brutal-canvas shrink-0">
        <button 
          onClick={() => setIsMobileSidebarOpen(true)}
          className="text-xs font-mono border border-brutal-border px-4 py-2 text-zinc-300 hover:bg-[#1a1a1a] flex items-center gap-2"
        >
          <span className="text-brutal-crimson font-bold">[=]</span> DIRECTORY INDEX
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Directory File Index Sidebar */}
      <div className={`
        ${isMobileSidebarOpen ? 'absolute inset-y-0 left-0 w-[85%] max-w-sm z-50 flex shadow-[20px_0_50px_rgba(0,0,0,0.9)]' : 'hidden'} 
        lg:static lg:flex lg:col-span-4 bg-brutal-canvas p-4 flex-col overflow-y-auto select-none border-r border-brutal-border
      `}>
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="text-xs font-mono text-brutal-textMuted uppercase tracking-widest">
            Index // System Directory
          </div>
          <button 
            className="lg:hidden text-brutal-crimson hover:text-white font-bold text-xl leading-none transition-colors"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="space-y-0.5">
          {portfolioData.projects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-sm border transition-all duration-150 rounded-none group ${
                  isSelected
                    ? 'bg-[#221010] border-brutal-crimson text-white'
                    : 'bg-transparent border-transparent text-zinc-400 hover:bg-brutal-surface hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-xs ${isSelected ? 'text-brutal-crimson' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {isSelected ? '■' : '□'}
                  </span>
                  <span className="truncate">{project.name}</span>
                </div>
                <span className="text-xs text-zinc-600 font-mono pl-2 shrink-0">{project.size}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Content Inspector Panel */}
      <div className="bg-brutal-surface lg:col-span-8 p-6 flex flex-col overflow-y-auto flex-1 lg:h-full border-t lg:border-t-0 border-brutal-border">
        {/* Project Metadata Header Frame */}
        <div className="border border-brutal-border bg-[#161616] p-4 font-mono text-sm mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-zinc-400 select-none">
          <div><span className="text-zinc-600">ID:</span> <span className="text-zinc-200">{selectedProject.id.toUpperCase()}</span></div>
          <div><span className="text-zinc-600">TYPE:</span> <span className="text-zinc-200">{selectedProject.type}</span></div>
          <div><span className="text-zinc-600">COMPILED:</span> <span className="text-zinc-200">{selectedProject.date}</span></div>
          <div className="col-span-2 sm:col-span-3 mt-1 pt-1 border-t border-[#262626] truncate">
            <span className="text-zinc-600">MODULES:</span>{' '}
            {selectedProject.tech.map((t, idx) => (
              <span key={t} className="text-brutal-crimson mr-1.5 font-bold">
                {t}{idx < selectedProject.tech.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Project Screenshot Display */}
        {selectedProject.image && (
          <div key={selectedProject.id} className="w-full mb-6 border border-brutal-border bg-[#111111] overflow-hidden group">
            <img 
              src={selectedProject.image} 
              alt={`${selectedProject.name} screenshot`} 
              className="w-full h-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              onError={(e) => {
                // Hide the container if the image fails to load
                (e.currentTarget.parentNode as HTMLDivElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Detailed Project Markdown Writeup */}
        <div className="flex-1 text-zinc-300 font-sans space-y-3 text-sm select-text select-markdown">
          <p className="font-mono text-zinc-400 leading-relaxed border-b border-brutal-border pb-3 mb-3">
            {selectedProject.summary}
          </p>
          <ReactMarkdown
            components={{
              h3: ({node, ...props}) => <h3 className="text-sm font-mono font-bold text-zinc-100 uppercase tracking-wider mb-2 mt-4 block" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pl-0.5" {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-mono font-bold text-zinc-200" {...props} />
            }}
          >
            {selectedProject.markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
