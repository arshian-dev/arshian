export interface Project {
  id: string;
  name: string;
  type: string;
  size: string; // To play into the File Explorer file-system aesthetic
  date: string;
  tech: string[];
  summary: string;
  markdownContent: string;
  image?: string;
}

export interface PortfolioData {
  bootSequence: string[];
  resumeRaw: string;
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  bootSequence: [
    "LOG: Initializing Arshian OS v2.2.6...",
    "LOG: Loading local-first core modules...",
    "LOG: System status: Operational.",
    "guest@arshian:~$ cat intro.md",
    "Full-Stack Software Engineer specializing in local-first system architectures, web application development, and high-density performance optimization."
  ],
  resumeRaw: `### Personal and Academic Summary\n\nComputer Science undergraduate specializing in Artificial Intelligence, full-stack development, and intelligent systems. Currently a Full-Stack Development Intern at Coding The Brains, building AI-powered web applications and real-time computer vision pipelines. Deeply experienced in engineering multi-tier applications across Python, JavaScript/TypeScript, and relational database systems.\n\n**Relevant Coursework:** Artificial Intelligence, Operating Systems, Software Design & Analysis, Database Systems, Data Structures & Algorithms, Theory of Computation, Web Development, Linear Algebra\n\n---\n\n### Technical Knowledge\n\n* **Languages:** Python, C++, SQL, JavaScript/TypeScript, HTML/CSS\n* **Full-Stack & Web Frameworks:** Django, Node.js, React, Vite, FastAPI, Express.js, RESTful APIs\n* **Databases & ORMs:** PostgreSQL, MySQL, SQLAlchemy, Django ORM, relational modeling, indexing & query optimization\n* **AI & Computer Vision:** YOLO (Object Detection), Computer Vision Pipelines, Search Algorithms (A*, BFS, DFS), Constraint Satisfaction\n* **Browser-Native Tech:** IndexedDB, localForage, Service Workers, Web Crypto/Compression APIs\n* **Systems & Architecture:** Process scheduling, synchronization, memory management, paging & virtual memory, x86 Assembly (MASM)\n* **Tools & Workflow:** Git, GitHub, Linux, NumPy, Pandas, Matplotlib, VS Code, PyCharm\n\n---\n\n### Experience\n\n**Coding The Brains** (Wah, Pakistan)\n*Full-Stack Development Intern | Jun 2026 – Present*\n\n* Develop and ship production-ready, AI-powered full-stack web applications utilizing Django, Node.js, and React.\n* Architected and deployed an automated employee monitoring system leveraging custom YOLO computer vision pipelines for real-time indoor activity and presence detection.\n* Processed and optimized application backend performance by structuring relational databases across PostgreSQL and MySQL, maximizing query execution efficiency.\n* Built MySpeakScore, an AI-driven speech evaluation application providing automated scoring and feedback.\n* Built Fitness Buddy, an AI-assisted fitness tracking application with personalized recommendations.\n\n---\n\n### Projects\n\n**Stix – Local-First Markdown Workspace** (*React, Vite, IndexedDB, Fuse.js, CryptoJS*)\n\n* Built a cloudless Markdown editor storing documents, media, and search indexes entirely on-device via IndexedDB, with no backend or accounts.\n* Designed a dual-scope version control system (snapshots, branching, diffing, restoration) and a local fuzzy-search engine with command palette.\n* Engineered an encrypted, compressed .stix vault format (AES + native CompressionStream) for portable, password-protected backups.\n\n**PitWall Pro – F1 Race Strategy Platform** (*Python, FastAPI, MySQL, SQLAlchemy*)\n\n* Built a simulation engine modeling tyre degradation and multi-stint race dynamics on real 2023 F1 data.\n* Implemented heuristic optimization to compare 1-stop vs 2-stop strategies via time-loss minimization.\n\n**Other Academic Projects**\n\n* **CityMind:** AI-driven smart city support system using constraint satisfaction, genetic algorithms, and A* routing.\n* **Parwana:** JavaFX/MySQL desktop MIS for refugee registration, aid distribution, and case tracking.\n* **Smart City Sim & 2D Platformer Games:** Custom C++ simulations utilizing manually built graph, tree, and hash-table data structures, alongside SFML game physics and state-based AI.\n\n---\n\n### Achievements & Competitions\n\n* **Datum Labs Data Visualization Competition:** Analytical storytelling under tight time constraints.\n* **Competitive Programming:** Participated in FPSC and ICPC contests at GIKI.\n* **Self-Directed AI Development:** Independent study of ML and modern AI tools beyond standard coursework.\n* **MUN & Debate:** 4 years of diplomacy, public speaking, and strategic communication.`,
  projects: [
    {
      id: "stix",
      name: "stix.app",
      type: "Application",
      size: "4.2 MB",
      date: "2026-06",
      tech: ["React", "IndexedDB", "Encryption"],
      summary: "A privacy-focused, local-first Markdown workspace engineered to operate entirely offline.",
      markdownContent: `### STIX // CLOUDLESS WORKSPACE\n- **Local-First Architecture:** Ensures absolute user data ownership via browser-native databases and a "Cloudless Architecture."\n- **Features:** On-device search, complex version control (branching/snapshots), and secure, encrypted vault backups.`,
      image: "/screenshots/stix.png"
    },
    {
      id: "pitwall",
      name: "pitwall_pro.exe",
      type: "Simulator",
      size: "45.2 MB",
      date: "2026-04",
      tech: ["Full-Stack", "F1 Telemetry", "Data Analytics"],
      summary: "A data-driven Formula 1 Mission Control simulator utilizing real telemetry.",
      markdownContent: `### PITWALL PRO // MISSION CONTROL\n- **Race Strategy:** Advanced race strategy engine predicting tire degradation and optimal pit windows.\n- **Telemetry:** Allows deep dive into live telemetry visualizations and granular car performance comparisons.`,
      image: "/screenshots/pitwall.png"
    },
    {
      id: "fitnessbuddy",
      name: "fitnessbuddy.exe",
      type: "Platform",
      size: "24.5 MB",
      date: "2026-05",
      tech: ["React/Vite", "Node.js", "PostgreSQL", "AI"],
      summary: "A comprehensive Personalized Fitness Intelligence Platform for coaches and clients.",
      markdownContent: `### FITNESS BUDDY // INTELLIGENCE PLATFORM\n- **Core Functionality:** Handles workout tracking, macro-nutrient logging, and coach-client relationship management.\n- **AI Integration:** Features an integrated AI Chat Widget providing dynamic, intelligent advice on meal substitutions and fitness inquiries.`,
      image: "/screenshots/fitnessbuddy.png"
    },
    {
      id: "citymind",
      name: "citymind.sim",
      type: "Simulation",
      size: "32.8 MB",
      date: "2026-02",
      tech: ["AI", "A* Pathfinding", "Genetic Algorithms"],
      summary: "A highly interactive urban planning simulation driven by advanced artificial intelligence algorithms.",
      markdownContent: `### CITYMIND // URBAN SIMULATION\n- **Procedural Generation:** Generates city infrastructure and optimizes complex logistical challenges in real-time.\n- **AI Driven:** Uses A* pathfinding for emergency routing and genetic algorithms for optimal hospital placement, visualized through a dynamic dashboard.`,
      image: "/screenshots/citymind.png"
    },
    {
      id: "parwana",
      name: "parwana_cmd.exe",
      type: "Command Center",
      size: "15.4 MB",
      date: "2026-01",
      tech: ["Full-Stack", "Logistics", "Security"],
      summary: "A centralized application built to streamline disaster relief and refugee logistics.",
      markdownContent: `### PARWANA // RELIEF MANAGEMENT\n- **Coordination:** Coordinates NGOs, allocates camp resources, and securely registers refugees.\n- **Accountability:** Focuses on transparency with automated audit reporting and secure fund tracking.`,
      image: "/screenshots/parwana.png"
    },
    {
      id: "chrono-rift",
      name: "chrono_rift.sh",
      type: "Game",
      size: "8.9 MB",
      date: "2025-12",
      tech: ["C/C++", "Multi-threading", "IPC"],
      summary: "A tactical terminal-based combat game implementing complex Operating Systems concepts.",
      markdownContent: `### CHRONO RIFT // TACTICAL TERMINAL\n- **OS Concepts:** Leverages shared memory, multi-threading, and inter-process communication.\n- **Synchronization:** Synchronizes an automated AI opponent against a human player in real-time without deadlocks.`,
      image: "/screenshots/chronorift.png"
    },
    {
      id: "mario-assembly",
      name: "mario.asm",
      type: "Game",
      size: "64 KB",
      date: "2025-04",
      tech: ["x86 Assembly", "Memory Management", "Low-Level"],
      summary: "A fully playable recreation of Super Mario Bros built entirely in low-level x86 Assembly.",
      markdownContent: `### MARIO ASSEMBLY // LOW-LEVEL GAMING\n- **No Engines:** Operating directly within the Windows console, showcasing custom physics engines and game loops without modern engines.\n- **Features:** Four complete worlds, dynamic boss battles, and a persistent scoring system.`,
      image: "/screenshots/mario.png"
    },
    {
      id: "lumina",
      name: "lumina.html",
      type: "Utility",
      size: "1.2 MB",
      date: "2026-03",
      tech: ["Vanilla JS", "CSS", "UI/UX"],
      summary: "A premium, web-based utility designed for photography, videography, and display testing.",
      markdownContent: `### LUMINA SCREEN // LIGHT PANEL\n- **Transformation:** Transforms any browser into a versatile light panel, providing an uninterrupted, distraction-free light source.\n- **Controls:** Features granular custom color control, a studio lighting temperature slider (1000K to 12000K), and quick presets.`,
      image: "/screenshots/lumina.png"
    },
    {
      id: "sonic-sfml",
      name: "sonic.exe",
      type: "Game",
      size: "54.7 MB",
      date: "2025-06",
      tech: ["C++", "SFML", "Physics"],
      summary: "A fast-paced 2D platformer paying tribute to Sonic the Hedgehog.",
      markdownContent: `### SONIC SFML // 2D PLATFORMER\n- **Custom Engine:** Features custom physics, side-scrolling levels, and boss encounters.\n- **Mechanics:** Players can switch dynamically between three characters, each with distinct movement abilities and mechanics.`,
      image: "/screenshots/sonic.png"
    },
    {
      id: "netflix-analytics",
      name: "netflix_analytics.ipynb",
      type: "Dashboard",
      size: "18.1 MB",
      date: "2025-11",
      tech: ["Python", "Machine Learning", "Data Science"],
      summary: "An exploratory data science project investigating a decade of Netflix Originals.",
      markdownContent: `### NETFLIX ANALYTICS // DATA EXPLORATION\n- **Visualization:** Uncovers trends in content production, subscriber growth, and revenue through a visual dashboard.\n- **Forecasting:** Compares traditional statistical forecasting against Machine Learning techniques to predict content performance metrics.`,
      image: "/screenshots/netflix-analytics.png"
    },
    {
      id: "city-similarity",
      name: "city_sim_network.py",
      type: "Data Analysis",
      size: "12.4 MB",
      date: "2025-10",
      tech: ["Python", "Graph Theory", "NetworkX", "Data Science"],
      summary: "A complex network analysis identifying similarities between cities based on temporal commodity price indices.",
      markdownContent: `### CITY SIMILARITY // NETWORK ANALYSIS\n- **Methodology:** Computes cosine similarity between cities based on temporal price changes and constructs thresholded similarity graphs.\n- **Graph Metrics:** Calculates multiple centrality metrics (degree, closeness, betweenness) to apply entropy and correlation-based weighting.\n- **Visualization:** Generates complex network graphs, heatmaps, and temporal Hasse diagrams.`
    },
    {
      id: "hospital-mgmt",
      name: "hospital_management.sys",
      type: "Portal",
      size: "22.6 MB",
      date: "2025-09",
      tech: ["Data Architecture", "Relational Models", "Backend"],
      summary: "A comprehensive hospital administration portal for real-world operational complexities.",
      markdownContent: `### HOSPITAL MANAGEMENT // HOSPITAL ADMINISTRATION\n- **Operations:** Manages patient admissions, ward allocations, consultant tracking, and administrative reporting.\n- **Data Integrity:** Built with a focus on robust data architecture to ensure data integrity across complex relational models.`,
      image: "/screenshots/hospital-mgmt.png"
    },
    {
      id: "simpleml",
      name: "simpleml.dll",
      type: "Library",
      size: "2.1 MB",
      date: "2025-08",
      tech: ["C++", "Neural Networks", "Math"],
      summary: "A lightweight neural network library built from the ground up in C++.",
      markdownContent: `### SIMPLEML // NEURAL NETWORKS\n- **Zero Dependencies:** Built without any external dependencies, implementing core mathematical fundamentals of deep learning.\n- **Educational:** Deconstructs the "black box" of AI, covering N-dimensional tensors, backpropagation, and optimization algorithms.`,
      image: "/screenshots/simpleml.png"
    }
  ]
};
