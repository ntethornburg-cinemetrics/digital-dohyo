# Digital Dohyo - Changelog

## 2026-02-27 - Milestone 1: Project Setup

### Built
- Project directory structure with docs/
- Documentation: PLAN.md, FEATURES.md, MEMORY.md, ARCHITECTURE.md, CHANGELOG.md
- Vite + React 18 + TypeScript scaffold
- Tailwind CSS + shadcn/ui configuration
- Placeholder pages: Landing, Analysis, Library, Progress, Auth, NotFound
- Navbar with route-aware active states (adapted from Lovable framework)
- React Router v6 setup with all routes
- Git repository initialized

### Learned
- shadcn/ui init requires specific config steps for Vite projects
- Navbar pattern: icon + hidden label text works well for mobile
- `npm create vite@latest --overwrite` removes existing dirs - scaffold first, then add docs
