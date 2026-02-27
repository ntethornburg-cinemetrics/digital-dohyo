# Digital Dohyo - Architecture

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 18 + TypeScript | Industry standard, great ecosystem |
| Build | Vite | Fast dev server, simple config |
| Styling | Tailwind CSS 3 + shadcn/ui | Utility-first CSS + accessible components |
| Routing | react-router-dom v6 | Standard React routing |
| Auth/DB/Storage | Supabase | Free tier, PostgreSQL, built-in auth |
| Charts | Recharts | Simple React charting |
| Icons | Lucide React | Tree-shakable icon library |
| Clip Extraction | ffmpeg.wasm | Client-side video processing (no server costs) |
| Hosting | Vercel | Free, auto-deploy from GitHub |

## Project Structure

```
digital-dohyo/
├── docs/                                 # Project documentation
├── src/
│   ├── main.tsx                          # App entry point
│   ├── App.tsx                           # Router setup
│   ├── index.css                         # Tailwind imports + shadcn theme
│   ├── lib/
│   │   └── utils.ts                      # cn() helper
│   ├── types/
│   │   ├── video.ts                      # Video/session types
│   │   └── annotation.ts                 # Annotation data model
│   ├── hooks/
│   │   ├── useVideoSync.ts              # Synchronized playback
│   │   ├── useAnnotation.ts             # Annotation state + undo/redo
│   │   ├── useFrameStepper.ts           # Frame-by-frame navigation
│   │   └── useLocalStorage.ts           # localStorage wrapper
│   ├── contexts/
│   │   ├── AuthContext.tsx               # Supabase auth state
│   │   └── VideoContext.tsx              # Shared video state
│   ├── components/
│   │   ├── ui/                           # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── PageLayout.tsx
│   │   ├── video/                        # Video player components
│   │   ├── annotation/                   # Drawing tools
│   │   ├── analysis/                     # Measurement, notes
│   │   └── progress/                     # Charts, history
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── Analysis.tsx
│   │   ├── Library.tsx
│   │   ├── Progress.tsx
│   │   ├── SessionDetail.tsx
│   │   └── NotFound.tsx
│   └── services/
│       ├── supabase.ts                   # Supabase client init
│       ├── storage.ts                    # File upload/download
│       └── sessions.ts                   # Session CRUD
├── supabase/migrations/                  # Database schema SQL
├── .env.local                            # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── components.json                       # shadcn/ui config
```

## Data Models

### Session (Supabase: `sessions` table)
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id     UUID REFERENCES auth.users NOT NULL
title       TEXT NOT NULL
notes       TEXT
created_at  TIMESTAMPTZ DEFAULT now()
updated_at  TIMESTAMPTZ DEFAULT now()
```

### Measurement (Supabase: `measurements` table)
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
session_id  UUID REFERENCES sessions ON DELETE CASCADE
user_id     UUID REFERENCES auth.users NOT NULL
technique   TEXT NOT NULL
metric      TEXT NOT NULL
value       NUMERIC NOT NULL
created_at  TIMESTAMPTZ DEFAULT now()
```

## Component Hierarchy

```
App
├── Navbar
└── Routes
    ├── Landing
    ├── Auth
    ├── Analysis
    │   ├── ViewModeSwitcher
    │   ├── SideBySideView / OverlayView / FocusView
    │   │   └── VideoPlayer
    │   │       ├── PlaybackControls
    │   │       └── AnnotationCanvas
    │   ├── AnnotationToolbar
    │   ├── MeasurementPanel
    │   └── SessionNotes
    ├── Library
    │   └── SessionHistory
    ├── Progress
    │   ├── MeasurementLog
    │   └── ProgressChart
    ├── SessionDetail
    └── NotFound
```

## Routing

| Path | Page | Auth Required |
|------|------|--------------|
| `/` | Landing | No |
| `/auth` | Auth | No |
| `/analysis` | Analysis | Yes (Phase 2) |
| `/library` | Library | Yes (Phase 2) |
| `/progress` | Progress | Yes (Phase 2) |
| `/session/:id` | SessionDetail | Yes (Phase 2) |
| `*` | NotFound | No |
