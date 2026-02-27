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

## 2026-02-27 - Milestone 2: Single Video Player

### Built
- `useFrameStepper.ts` hook — play/pause, frame advance (1/30s), speed control, seek, time formatting
- `VideoPlayer.tsx` — video element with click-to-play, play indicator overlay, scrubber
- `PlaybackControls.tsx` — transport buttons, scrubber bar, speed selectors (0.25x–2x)
- `VideoUploader.tsx` — file input + drag-and-drop with Object URL creation
- Analysis page wired up with single video player

### Learned
- Hook's `changeSpeed` needs `number` param (not narrow union) to match generic control props
- `URL.revokeObjectURL` cleanup needed when video source changes or component unmounts
