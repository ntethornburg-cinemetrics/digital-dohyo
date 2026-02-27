# Digital Dohyo - Development Plan

## Overview

Subscription-based sumo video analysis web app. Users upload sumo videos, compare them side-by-side or overlaid, annotate techniques, and track progress over time.

## Infrastructure

| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | Hosting, serverless functions, auto-deploy from Git | $0 (free tier) |
| Supabase | Auth, PostgreSQL database, file storage | $0 (free tier) |
| GitHub | Source control | $0 |

## Tech Stack

- React 18 + TypeScript (Vite)
- Tailwind CSS 3 + shadcn/ui
- react-router-dom v6
- Supabase (auth, DB, storage)
- Recharts (charts)
- HTML5 Canvas API (annotations)
- ffmpeg.wasm (client-side clip extraction)

## Build Order - 10 Milestones

### Milestone 1: Project Setup + First Deploy
- [x] Create repo with docs
- [x] Vite scaffold with React-TS
- [x] Tailwind + shadcn/ui + react-router-dom
- [x] Placeholder pages (Landing, Analysis, Library, Progress, Auth, NotFound)
- [x] Navbar component
- [ ] Git init, push to GitHub, connect Vercel

### Milestone 2: Single Video Player
- [ ] VideoPlayer.tsx with scrubber and time display
- [ ] VideoUploader.tsx with file input + Object URLs
- [ ] PlaybackControls.tsx (play/pause, frame-step, speed)
- [ ] useFrameStepper.ts hook (FRAME_DURATION = 1/30)

### Milestone 3: Side-by-Side + Sync Playback
- [ ] useVideoSync.ts for two synced video refs
- [ ] SideBySideView.tsx with flex layout
- [ ] Master scrubber with offset support
- [ ] Keyboard shortcuts (Space, arrows, number keys)

### Milestone 4: Overlay / Onion-Skin Mode
- [ ] OverlayView.tsx with stacked videos
- [ ] Opacity slider
- [ ] Swap layers button
- [ ] ViewModeSwitcher.tsx

### Milestone 5: Focus Mode + Upload Polish
- [ ] FocusView.tsx (single video, larger)
- [ ] Focus buttons in side-by-side
- [ ] Drag-and-drop upload
- [ ] File size validation

### Milestone 6: Annotation Drawing Tools
- [ ] Annotation types and data model
- [ ] useAnnotation.ts (store, undo/redo, localStorage)
- [ ] AnnotationRenderer.ts (freehand, lines, angles, circles, rectangles, arrows)
- [ ] AnnotationCanvas.tsx (canvas overlay, mouse handlers)
- [ ] AnnotationToolbar.tsx (tool/color/size selection)

### Milestone 7: Advanced Annotations + Screenshots
- [ ] Select tool with hit-testing
- [ ] Drag-to-move with keyframes
- [ ] KeyframeTimeline.tsx
- [ ] Screenshot capture (video frame + annotations to PNG)

### Milestone 8: Auth + Database + Sessions
- [ ] Supabase project setup
- [ ] AuthContext.tsx + Auth.tsx page
- [ ] Database schema (sessions, measurements, annotations_export)
- [ ] Row Level Security policies
- [ ] ProtectedRoute.tsx
- [ ] sessions.ts service (CRUD)

### Milestone 9: Progress Tracking + Notes
- [ ] SessionNotes.tsx (auto-saving)
- [ ] MeasurementLog.tsx (technique/metric/value entries)
- [ ] ProgressChart.tsx (Recharts line chart)
- [ ] SessionHistory.tsx + SessionDetail.tsx

### Milestone 10: Clip Extractor + Final Polish
- [ ] ffmpeg.wasm clip extraction
- [ ] Landing page polish
- [ ] Library page with real data
- [ ] Subscribe page (informational)
- [ ] Error boundaries, loading/empty states
- [ ] Mobile responsiveness pass

## Estimated Effort

| Milestones | Sessions | Deliverable |
|-----------|----------|-------------|
| 1-5 | 8-13 | Video comparison tool with 3 view modes |
| 6-7 | 6-8 | Annotation and measurement system |
| 8-9 | 4-6 | User accounts, sessions, progress tracking |
| 10 | 3-4 | Clip extractor, landing page, mobile |
| **Total** | **21-31** | **Fully functional MVP** |
