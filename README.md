# Arshian's Portfolio

A high-performance, single-page scrolling portfolio utilizing a **Brutalist Web OS aesthetic**. It combines absolute rectilinear shapes (0px border radius), high-density typography, and a strict charcoal/crimson color palette (`brutal.canvas`, `brutal.surface`, `brutal.crimson`) to create an intense "Kinetic Terminal" visual experience.

## Architecture & Tech Stack

- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS (Custom brutalist primitive configuration)
- **Data Rendering**: `react-markdown`
- **Typography**: Geist (UI structure), JetBrains Mono (Terminal & Code)

## Design Paradigm: "Kinetic Terminal"

Rather than trapping the user in a simulated desktop with draggable windows, the application leverages standard single-page vertical scrolling for maximum accessibility, while styling individual semantic sections to mirror core OS utilities wrapped in a uniform `WindowFrame` component:

1. **Terminal Hero (`#about`)**: An automated boot sequence animation simulating a terminal startup that types out a personalized introduction.
2. **Markdown Workspace (`#experience`)**: A split-pane text editor interface statically displaying the raw markdown source of your resume alongside the rendered preview.
3. **File Explorer (`#projects`)**: A responsive, interactive list-view interface that allows users to dynamically select and preview detailed write-ups of your engineering projects (Stix, SpeakScore, Pitwall).

## Project Structure & Data Engine

- **`src/data/portfolio.ts`**: The strongly-typed central data engine powering the application. All resume data, projects, and system configurations are isolated here using the `PortfolioData` interface.
- **`src/apps/`**: Contains the specific OS utility components (`TerminalShell`, `MarkdownWorkspace`, `FileExplorer`).
- **`src/components/WindowFrame.tsx`**: The highly reusable, static wrapper that enforces the brutalist window chrome (title bar, borders) around the different portfolio sections.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
