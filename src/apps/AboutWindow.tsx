

export default function AboutWindow() {
  const skills = {
    "Languages": ["Python", "C++", "SQL", "JavaScript/TypeScript", "HTML/CSS"],
    "Frameworks & APIs": ["Django", "Node.js", "React", "Vite", "FastAPI", "Express.js", "RESTful APIs"],
    "Databases & ORMs": ["PostgreSQL", "MySQL", "SQLAlchemy", "Django ORM"],
    "AI & Computer Vision": ["YOLO (Object Detection)", "CV Pipelines", "A* / BFS / DFS", "Constraint Satisfaction"],
    "Browser-Native": ["IndexedDB", "localForage", "Service Workers", "Web Crypto", "Compression APIs"],
    "Systems & Arch": ["Process Scheduling", "Synchronization", "Memory Management", "Virtual Memory", "x86 Assembly"]
  };

  return (
    <div className="flex-1 w-full bg-brutal-canvas text-zinc-300 font-mono text-sm overflow-y-auto p-4 md:p-6 custom-scrollbar flex flex-col gap-6 select-text cursor-text">
      
      {/* Header Section: Photo and GitHub Widget */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Profile Photo */}
        <div className="shrink-0 group">
          <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-brutal-border bg-[#111] overflow-hidden relative group-hover:border-brutal-crimson transition-colors duration-300">
            {/* 
              Placeholder for the actual photo. We're using a local file placed in public/profile.png.
              If the user replaces it, the path remains the same.
            */}
            <img 
              src="/arshian.jpeg" 
              alt="Arshian Ali" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-brutal-crimson/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center group-hover:text-brutal-crimson transition-colors">
            SYS_ADMIN_NODE
          </div>
        </div>

        {/* Info & GitHub Widget */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="border border-brutal-border bg-[#111] p-4 group hover:border-brutal-textMuted transition-colors">
            <h2 className="text-xl font-sans font-bold text-zinc-100 tracking-tight uppercase mb-1 flex items-center gap-2">
              <span className="text-brutal-crimson">::</span> ARSHIAN ALI
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Full-Stack Software Engineer & AI Specialist. Focusing on local-first system architectures, intelligent web applications, and brutal absolute optimization.
            </p>
            
            {/* GitHub Widget */}
            <div className="border-t border-[#222] pt-4 mt-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-100 text-black flex items-center justify-center rounded-sm">
                    {/* SVG GitHub Icon */}
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-200">github.com/arshian-dev</div>
                    <div className="text-[10px] text-zinc-500">18 Repositories // Active</div>
                  </div>
                </div>
                <a 
                  href="https://github.com/arshian-dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-brutal-border text-[10px] uppercase font-bold text-zinc-400 hover:text-white hover:border-white hover:bg-white/5 transition-all w-full sm:w-auto text-center"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Skills Matrix */}
      <div className="border border-brutal-border bg-[#0a0a0a] p-1">
        <div className="bg-[#111] px-4 py-2 border-b border-brutal-border flex items-center justify-between">
          <span className="text-[10px] font-bold text-brutal-crimson tracking-widest uppercase">TECH_STACK_MATRIX</span>
          <span className="text-[10px] text-zinc-600">v2026.06</span>
        </div>
        
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2">
              <div className="text-xs text-zinc-500 font-bold border-b border-[#222] pb-1 uppercase tracking-wider">
                {category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] px-2 py-0.5 bg-[#1a1a1a] border border-[#333] text-zinc-300 hover:border-brutal-crimson hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
