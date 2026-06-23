import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data/portfolio';

export default function FileExplorer() {
  const [selectedProject, setSelectedProject] = useState<Project>(portfolioData.projects[0]);

  return (
    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-px bg-brutal-border min-h-0">
      {/* Directory File Index Sidebar */}
      <div className="bg-brutal-canvas lg:col-span-4 p-4 flex flex-col overflow-y-auto select-none">
        <div className="text-xs font-mono text-brutal-textMuted uppercase tracking-widest mb-4 px-2">
          Index // System Directory
        </div>
        <div className="space-y-0.5">
          {portfolioData.projects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
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
      <div className="bg-brutal-surface lg:col-span-8 p-6 flex flex-col overflow-y-auto h-[350px] lg:h-full border-t lg:border-t-0 border-brutal-border">
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
