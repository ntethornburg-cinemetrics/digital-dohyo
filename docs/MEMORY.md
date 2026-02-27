# Digital Dohyo - Session Memory

Running log of decisions, lessons, and gotchas. Carries context across development sessions.

## Key Decisions

- **2026-02-27**: Chose Vercel + Supabase over self-hosted VPS. Rationale: zero DevOps, free tier generous enough for MVP, beginner-friendly.
- **2026-02-27**: No Redux, no Next.js, no Docker. Keep dependencies minimal for a learning project.
- **2026-02-27**: Cherry-picking from two existing codebases rather than using either as a starting point. player.html has proven video logic; Lovable scaffold has UI patterns. Building fresh ensures understanding.
- **2026-02-27**: Using Tailwind v3 + shadcn/ui to match Lovable reference code patterns.
- **2026-02-27**: Vite scaffolded with React 19 + react-router-dom v7 (latest). API is backwards compatible with v6 patterns from Lovable reference. No reason to downgrade.

## Source Code Reference Map

Key sections of `web_app_code_draft/player.html` to port:
- **Frame stepping**: lines 2637-2702
- **Format time**: lines 2426-2438
- **Speed control**: lines 3020-3041
- **Play/pause sync**: lines 2948-2998
- **Offset logic**: lines 2880-2888
- **Overlay CSS**: lines 227-275
- **Overlay toggle**: lines 2499-2558
- **Annotation model**: lines 1161-1236
- **Annotation rendering**: lines 1284-1416
- **Mouse handlers**: lines 2097-2375
- **Coordinate normalization**: lines 1239-1278
- **Hit testing**: lines 1589-1636
- **Screenshot**: lines 2378-2421

## Patterns Established

- Navbar uses icon + hidden text pattern for mobile responsiveness
- Active route detection via `useLocation().pathname`
- `cn()` utility from clsx + tailwind-merge for className composition
- shadcn/ui Button with `asChild` prop for Link wrapping

## Gotchas

- `npm create vite@latest` with `--overwrite` deletes existing directories in the target. Create docs after scaffolding, not before.
