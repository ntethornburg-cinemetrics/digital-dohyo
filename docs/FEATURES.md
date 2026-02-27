# Digital Dohyo - Feature Spec

## Summary Checklist

### Video Playback
- [ ] Single video player with scrubber and time display
- [ ] Play/pause, frame-step forward/back
- [ ] Playback speed control (0.25x, 0.5x, 1x, 2x)
- [ ] Video upload via file picker
- [ ] Drag-and-drop upload

### Comparison Modes
- [ ] Side-by-side view (two videos)
- [ ] Overlay/onion-skin view (stacked with opacity)
- [ ] Focus view (single video enlarged)
- [ ] View mode switcher
- [ ] Synchronized playback across both videos
- [ ] Master scrubber with offset support
- [ ] Swap layers in overlay mode

### Annotation Tools
- [ ] Freehand drawing
- [ ] Straight lines
- [ ] Angle measurement (with degree display)
- [ ] Circles, rectangles, arrows
- [ ] Color and size selection
- [ ] Undo/redo
- [ ] Annotations persist in localStorage
- [ ] Select and drag annotations
- [ ] Keyframe-based annotation tracking
- [ ] Screenshot capture (video frame + annotations)

### Auth & Data
- [ ] Sign up / sign in with email
- [ ] Protected routes
- [ ] Session CRUD (create, read, update, delete)
- [ ] Row Level Security (users see only their data)

### Progress Tracking
- [ ] Training notes per session
- [ ] Manual measurement logging
- [ ] Progress charts over time
- [ ] Session history browser

### Polish
- [ ] Landing page
- [ ] Library page
- [ ] Subscribe page (informational)
- [ ] Error boundaries
- [ ] Loading and empty states
- [ ] Mobile responsive
- [ ] Client-side clip extraction (ffmpeg.wasm)

---

## Detailed Feature Specs

### F1: Video Player

**User Story**: As a user, I want to upload a video and control playback frame-by-frame so I can analyze specific moments in a sumo bout.

**Acceptance Criteria**:
- Upload via file picker creates Object URL for playback
- Play/pause toggles with visual indicator
- Frame-step moves exactly 1 frame (1/30s)
- Speed control offers 0.25x, 0.5x, 1x, 2x
- Time display shows current time / duration in mm:ss.ff format
- Scrubber allows seeking to any position

**Technical Notes**:
- Port frame stepping from player.html lines 2637-2702
- Port format time from player.html lines 2426-2438
- Port speed control from player.html lines 3020-3041

### F2: Side-by-Side Comparison

**User Story**: As a user, I want to view two videos side-by-side and sync their playback so I can compare my technique to a reference.

**Acceptance Criteria**:
- Two video players displayed horizontally
- Labels: "Reference" and "Your Performance"
- Synced play/pause/speed
- Master scrubber seeks both with optional offset
- Individual scrubbers for fine adjustment
- Keyboard shortcuts: Space (play/pause), arrows (frame step), 1-4 (speed)

**Technical Notes**:
- Port togglePlayPause from player.html lines 2948-2998
- Port offset logic from player.html lines 2880-2888

### F3: Overlay View

**User Story**: As a user, I want to overlay two videos with adjustable opacity so I can see technique differences directly.

**Acceptance Criteria**:
- Two videos stacked via absolute positioning
- Opacity slider (0-100%) controls top video
- Swap button toggles which video is on top
- Sync playback works in overlay mode

**Technical Notes**:
- Port overlay CSS from player.html lines 227-275
- Port toggleOverlayMode from player.html lines 2499-2558

### F4: Annotation System

**User Story**: As a user, I want to draw annotations on video frames to mark body positions, angles, and technique details.

**Acceptance Criteria**:
- Canvas overlay positioned exactly over video
- Drawing tools: freehand, line, angle, circle, rectangle, arrow
- Color picker and stroke size
- Undo/redo (Ctrl+Z / Ctrl+Shift+Z)
- Annotations saved to localStorage
- Select tool for repositioning
- Angle tool displays degrees
- Coordinate normalization for different video sizes

**Technical Notes**:
- Port annotation model from player.html lines 1161-1236
- Port rendering from player.html lines 1284-1416
- Port mouse handlers from player.html lines 2097-2375
- Port coordinate normalization from player.html lines 1239-1278
- Port hit testing from player.html lines 1589-1636

### F5: Auth & Sessions

**User Story**: As a user, I want to create an account so my analysis sessions persist across devices.

**Acceptance Criteria**:
- Email/password sign up with validation
- Sign in with error feedback
- Protected routes redirect to auth
- Sessions stored in Supabase with user_id
- RLS prevents cross-user data access

### F6: Progress Tracking

**User Story**: As a user, I want to log measurements and see my improvement over time.

**Acceptance Criteria**:
- Text notes auto-save per session
- Log technique + metric + value entries
- Line chart showing measurement trends
- Filter by technique and metric
- Session history with date and summary
