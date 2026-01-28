# Slidedown v2 - Product Roadmap

**Current Version**: 2.0-beta
**Current Feature Parity**: 85%
**Last Updated**: 2026-01-27

---

## ✅ Completed (v2.0-beta)

- [x] Custom React renderer (no reveal.js)
- [x] Fragment animations (12+ types)
- [x] Math rendering (KaTeX/LaTeX)
- [x] Custom slide backgrounds
- [x] Definition lists
- [x] All basic markdown elements
- [x] Table of Contents sidebar
- [x] Keyboard navigation
- [x] Vertical slides
- [x] Progress bar & slide counter
- [x] Code syntax highlighting
- [x] Responsive design (partial)

**Status**: Beta - 85% feature parity with reveal.js

---

## 🎯 Next Up: Path to 1.0

### Phase 1: Essential Presentation Features (2-3 weeks)
**Goal**: Reach 95% feature parity, production-ready

#### 1. Speaker Notes View (HIGH PRIORITY)
**Impact**: Critical for presenters
**Complexity**: Medium
**Time**: 3-4 days

**Features**:
- Split-screen presenter view
- Current slide + next slide preview
- Speaker notes display
- Presentation timer
- Elapsed/remaining time
- Keyboard shortcut (S key)

**Why essential**: Presenters need to see their notes without audience seeing them.

**Implementation**:
- New `SpeakerView.jsx` component
- Window.open() for separate presenter window
- postMessage for sync between windows
- Display parsed speaker notes from slides

---

#### 2. Overview Mode (HIGH PRIORITY)
**Impact**: High - navigation and slide management
**Complexity**: Medium
**Time**: 2-3 days

**Features**:
- Grid view of all slides (thumbnails)
- Keyboard shortcut (O key or Esc)
- Click slide to jump to it
- Highlight current slide
- Smooth zoom in/out animation

**Why essential**: Quick navigation, seeing presentation structure at a glance.

**Implementation**:
- CSS Grid layout (4-5 columns)
- Scale down slide content
- Framer Motion for zoom transitions
- New component `OverviewGrid.jsx`

---

#### 3. Fullscreen Mode (MEDIUM PRIORITY)
**Impact**: High - professional presentations
**Complexity**: Low
**Time**: 1 day

**Features**:
- Native browser fullscreen API
- Keyboard shortcut (F key)
- Exit with Esc
- Works on all slides

**Why essential**: Standard expectation for presentations.

**Implementation**:
- Use `document.documentElement.requestFullscreen()`
- Handle fullscreenchange events
- Add fullscreen toggle to Navigation component

---

#### 4. More Transition Styles (MEDIUM PRIORITY)
**Impact**: Medium - visual polish
**Complexity**: Low-Medium
**Time**: 2 days

**Features**:
- Fade transition
- Zoom in/out transition
- Convex/concave (optional)
- Per-slide transition override
- Configurable transition speed

**Why important**: Currently only vertical slide works, need variety.

**Implementation**:
- New variants in Slide.jsx
- Parse `data-transition` attribute (already parsing)
- Apply different Framer Motion animations

---

#### 5. PDF Export (MEDIUM-HIGH PRIORITY)
**Impact**: High - sharing presentations
**Complexity**: High
**Time**: 4-5 days

**Features**:
- Export to PDF (print-friendly)
- One slide per page
- Preserve styling
- Include fragment steps (optional)
- Progress indicator during export

**Why important**: Sharing, handouts, archival.

**Implementation**:
- Use `html2canvas` + `jsPDF`
- Or browser print API with special CSS
- Render all slides sequentially
- Handle fragments (flatten or expand)

**Alternatives**:
- Browser print with `@media print` CSS
- Server-side rendering with Puppeteer (requires backend)

---

### Phase 2: Polish & Mobile (1-2 weeks)
**Goal**: Mobile-friendly, production-quality

#### 6. Touch Gestures & Mobile Support
**Impact**: High - mobile presentations
**Complexity**: Medium
**Time**: 3 days

**Features**:
- Swipe left/right for navigation
- Swipe up/down for vertical slides
- Pinch to zoom (optional)
- Touch-friendly navigation controls
- Responsive layout improvements
- Mobile-optimized fonts/spacing

**Implementation**:
- Use Framer Motion drag handlers
- Or react-swipeable library
- Detect touch vs mouse
- Larger touch targets on mobile

---

#### 7. Code Line Highlighting
**Impact**: Medium - technical presentations
**Complexity**: Low-Medium
**Time**: 2 days

**Features**:
- Highlight specific lines: `{1,3-5,8}`
- Highlight on fragment reveal
- Line numbers (optional)
- Different highlight colors

**Implementation**:
- Extend rehype-highlight
- Parse line numbers from code fence
- Apply CSS classes to specific lines
- Fragment integration for stepped highlighting

---

#### 8. Auto-Animate
**Impact**: Medium - smooth transitions
**Complexity**: High
**Time**: 5-6 days

**Features**:
- Animate elements between slides
- Match elements by data-id
- Smooth position/size transitions
- Configurable easing and duration

**Why cool**: Makes element transitions feel magical.

**Implementation**:
- Parse `data-auto-animate` attribute (already parsing)
- Track elements across slides
- Use Framer Motion layout animations
- Complex: need element matching algorithm

---

#### 9. Help Overlay / Keyboard Shortcuts
**Impact**: Medium - discoverability
**Complexity**: Low
**Time**: 1 day

**Features**:
- Press ? to show keyboard shortcuts
- Modal overlay with all commands
- Searchable/filterable
- Print-friendly

**Implementation**:
- New `HelpOverlay.jsx` component
- List all keyboard shortcuts
- Modal with Tailwind styling

---

### Phase 3: Power User Features (2-3 weeks)
**Goal**: Advanced capabilities

#### 10. Slide Timings & Auto-Advance
**Impact**: Low-Medium - automated presentations
**Complexity**: Low
**Time**: 2 days

**Features**:
- Auto-advance after N seconds
- Per-slide timing: `data-autoslide="5000"`
- Pause/resume auto-advance
- Visual countdown timer

**Use cases**: Kiosk mode, demos, auto-playing decks.

---

#### 11. Presentation Configuration
**Impact**: Medium - customization
**Complexity**: Medium
**Time**: 3 days

**Features**:
- Config file (JSON or YAML)
- Theme selection
- Default transition
- Controls visibility
- Progress bar on/off
- Slide numbers format
- Keyboard shortcuts customization

**Implementation**:
- Load config from frontmatter or separate file
- Merge with defaults
- Pass to components via context

---

#### 12. Themes System
**Impact**: High - visual customization
**Complexity**: Medium
**Time**: 4-5 days

**Features**:
- Multiple built-in themes
- Dark/light variants
- Theme switcher UI
- Custom theme support (CSS variables)
- Theme preview

**Implementation**:
- CSS custom properties for colors
- Separate theme files
- ThemeContext in React
- localStorage for persistence

---

#### 13. Slide Backgrounds (Enhanced)
**Impact**: Medium - visual variety
**Complexity**: Medium
**Time**: 2-3 days

**Features**:
- Video backgrounds
- iframe backgrounds (embed websites)
- Animated gradients
- Parallax scrolling backgrounds
- Background transitions

**Already have**: Colors, images, size, position, opacity

---

### Phase 4: Game Changers (3-4 weeks)
**Goal**: Features that beat reveal.js

#### 14. Markdown Editor (MAJOR)
**Impact**: VERY HIGH - easier content creation
**Complexity**: High
**Time**: 1-2 weeks

**Features**:
- Split-pane editor (markdown | preview)
- Syntax highlighting in editor
- Live preview as you type
- Auto-save to localStorage
- File import/export
- Drag to reorder slides
- Slide templates
- Image upload/embedding

**Why game-changer**: No more switching between text editor and browser.

**Implementation**:
- CodeMirror or Monaco editor
- Real-time markdown parsing
- Sync scroll between editor and preview
- File system API for loading/saving

---

#### 15. Presentation Library
**Impact**: HIGH - managing multiple decks
**Complexity**: High
**Time**: 1 week

**Features**:
- List all saved presentations
- Create new from template
- Duplicate/delete presentations
- Search presentations
- Tags/categories
- Thumbnail previews
- Last modified date
- Import/export

**Storage options**:
- localStorage (simple, limited)
- IndexedDB (better for large decks)
- Cloud storage (optional, Phase 5)

---

#### 16. AI-Powered Features
**Impact**: VERY HIGH - unique selling point
**Complexity**: High
**Time**: 2-3 weeks

**Features**:
- Generate slides from outline
- Suggest improvements to content
- Auto-generate speaker notes
- Image suggestions
- Grammar/clarity checking
- Slide design suggestions
- Content summarization

**Implementation**:
- OpenAI API or Anthropic Claude API
- Streaming responses
- Token management
- Rate limiting
- Cost controls

**Why game-changer**: No other presentation tool has native AI.

---

#### 17. Collaboration (MAJOR)
**Impact**: HIGH - team presentations
**Complexity**: Very High
**Time**: 3-4 weeks

**Features**:
- Real-time co-editing
- Multiplayer cursors
- Comments on slides
- Suggested edits/reviews
- Version history
- Conflict resolution
- User permissions

**Implementation**:
- WebSocket server (Node.js)
- Operational Transform or CRDT
- User authentication
- Database for persistence
- Y.js or similar library

**Alternatives**:
- Simple: Share link, one editor at a time
- Medium: Turn-based editing with locks
- Full: Real-time CRDT-based collaboration

---

#### 18. Advanced Exports
**Impact**: Medium - sharing options
**Complexity**: Medium-High
**Time**: 1 week

**Features**:
- Single HTML file (self-contained)
- Static site (multi-page HTML)
- Video recording (slides → MP4)
- Animated GIF
- PowerPoint (PPTX)
- Google Slides import/export

**Implementation**:
- HTML: Inline all CSS/JS/images (base64)
- Video: Canvas recording + MediaRecorder API
- PPTX: Use PptxGenJS library

---

### Phase 5: Platform Features (4+ weeks)
**Goal**: Full platform experience

#### 19. Cloud Storage & Sync
**Features**:
- Save to cloud
- Sync across devices
- Share presentations (view/edit links)
- Public gallery
- Embed presentations on websites

**Implementation**:
- Backend API (Node.js, Python, Go)
- Database (PostgreSQL, MongoDB)
- File storage (S3, Cloudflare R2)
- Authentication (Auth0, Clerk, Supabase)
- CDN for assets

---

#### 20. Analytics Dashboard
**Features**:
- View counts
- Time spent on each slide
- Fragment reveal rates
- Audience engagement metrics
- Heatmaps
- Export analytics

**Implementation**:
- Event tracking
- Analytics backend
- Dashboard UI
- Privacy controls

---

#### 21. Plugins System
**Features**:
- Plugin API
- Community plugins
- Plugin marketplace
- Easy installation
- Plugin settings

**Examples**:
- Charts/graphs plugin
- Diagram plugin (Mermaid)
- Quiz/poll plugin
- Drawing/annotation plugin
- Webcam overlay plugin

---

## 📊 Recommended Priority Order

### Immediate (Next 2 Weeks)
**Target**: v2.1 - Production Ready

1. **Speaker Notes View** (4 days) - Critical for presenters
2. **Overview Mode** (3 days) - Essential navigation
3. **Fullscreen Mode** (1 day) - Basic expectation
4. **More Transitions** (2 days) - Visual variety
5. **Touch Gestures** (3 days) - Mobile support
6. **Help Overlay** (1 day) - Discoverability

**Total**: 14 days → **v2.1 Release**
**Result**: 95% feature parity, production-ready

---

### Next Sprint (Weeks 3-4)
**Target**: v2.2 - Power Features

7. **PDF Export** (5 days) - Sharing
8. **Code Line Highlighting** (2 days) - Technical talks
9. **Themes System** (5 days) - Customization
10. **Presentation Config** (3 days) - Flexibility

**Total**: 15 days → **v2.2 Release**
**Result**: Polished, professional tool

---

### Following Month
**Target**: v3.0 - Game Changer

11. **Markdown Editor** (10 days) - Major feature
12. **Presentation Library** (7 days) - Management
13. **Auto-Animate** (6 days) - Advanced animations
14. **AI Features** (15 days) - Unique capability

**Total**: 38 days → **v3.0 Release**
**Result**: Best-in-class presentation tool

---

## 🎯 Success Metrics

### v2.1 (Production Ready)
- ✅ 95% feature parity with reveal.js
- ✅ Works on mobile
- ✅ Can give real presentations
- ✅ Presenter mode available

### v2.2 (Professional)
- ✅ PDF export working
- ✅ Multiple themes
- ✅ Customizable configuration
- ✅ Code presentations shine

### v3.0 (Market Leader)
- ✅ Built-in editor
- ✅ AI assistance
- ✅ Presentation management
- ✅ Better than reveal.js

---

## 🚀 Quick Wins (Do These First!)

### Week 1
**Day 1-2**: Fullscreen mode (easy win)
**Day 3**: Help overlay (easy, high value)
**Day 4-5**: More transitions (visual improvement)

### Week 2
**Day 1-3**: Overview mode (important)
**Day 4-5**: Touch gestures basics (mobile)

After 2 weeks, you'll have **v2.1** ready for real presentations!

---

## 💡 What Makes This Better Than reveal.js

### Already Better
- ✅ Faster performance
- ✅ Modern tech stack
- ✅ Better developer experience
- ✅ TOC sidebar
- ✅ Smaller bundle

### Will Be Better (v3.0)
- 🎯 Built-in editor (reveal.js needs separate tool)
- 🎯 AI assistance (unique)
- 🎯 Presentation library (built-in)
- 🎯 Better mobile support
- 🎯 Modern React architecture
- 🎯 Easier to customize

---

## 📋 Feature Comparison Target

| Feature | reveal.js | Slidedown v2.0 | Slidedown v2.1 | Slidedown v3.0 |
|---------|-----------|----------------|----------------|----------------|
| Fragments | ✅ | ✅ | ✅ | ✅ |
| Math | ✅ | ✅ | ✅ | ✅ |
| Speaker View | ✅ | ❌ | ✅ | ✅ |
| Overview | ✅ | ❌ | ✅ | ✅ |
| PDF Export | ✅ | ❌ | ✅ | ✅ |
| Mobile | ⚠️ | ⚠️ | ✅ | ✅ |
| Editor | ❌ | ❌ | ❌ | ✅ |
| AI | ❌ | ❌ | ❌ | ✅ |
| Library | ❌ | ❌ | ❌ | ✅ |
| **Parity** | 100% | 85% | 95% | 120% |

---

## 🎬 Conclusion

### Next Immediate Steps

1. **Speaker Notes View** - Most requested feature
2. **Overview Mode** - Essential for navigation
3. **Fullscreen Mode** - Quick win
4. **Mobile Support** - Expand audience

Complete these 4 and you have a **production-ready** presentation tool!

Then build the **editor** and **AI features** to leapfrog reveal.js completely.

---

**Questions to Answer**:

1. Should we focus on **feature parity** (v2.1) or jump to **unique features** (v3.0)?
2. Is **cloud/collaboration** important or keep it **local-first**?
3. Should **AI features** require API keys or build a backend?
4. Desktop app (Electron) or stay web-only?

**Recommendation**:
- **Next 2 weeks**: Get to v2.1 (production-ready)
- **Next month**: Build editor (v3.0-alpha)
- **Next 3 months**: Add AI and become market leader

---

**Last Updated**: 2026-01-27
**Status**: Roadmap Ready for Execution
