# Slidedown v2 - Revised Roadmap

**Current Version**: 2.0-beta (85% feature parity)
**Target**: Focus on what matters
**Last Updated**: 2026-01-27

---

## ✅ What We Have (v2.0-beta)

- [x] Custom React renderer
- [x] Fragment animations (12+ types)
- [x] Math rendering (KaTeX)
- [x] Custom slide backgrounds
- [x] All markdown elements
- [x] TOC sidebar
- [x] Keyboard navigation
- [x] Vertical slides
- [x] Code syntax highlighting

---

## 🎯 Revised Priority List

Based on your feedback, here's what actually matters:

### TIER 1: Core Presentation Features (MUST HAVE)
**Timeline**: 1-2 weeks

1. **Speaker Notes View** ⭐⭐⭐⭐⭐
   - You said: GREAT
   - Time: 3-4 days
   - Why: Can't give real presentations without this
   - Impact: Unlocks actual usage

2. **Overview Mode** ⭐⭐⭐⭐⭐
   - You said: GREAT
   - Time: 2-3 days
   - Why: Essential navigation, see whole deck
   - Impact: Professional workflow

3. **Responsive Design** ⭐⭐⭐⭐
   - You said: This is what matters (not touch gestures)
   - Time: 2-3 days
   - Why: Works on any screen size
   - Impact: Mobile-friendly viewing

4. **Fullscreen Mode** ⭐⭐⭐
   - You said: Useful
   - Time: 1 day
   - Why: Standard expectation
   - Impact: Quick win, professional

**Total**: ~10 days
**Result**: Production-ready presentation tool

---

### TIER 2: Game Changer (HIGH VALUE)
**Timeline**: Week 3-4

5. **Markdown Editor** ⭐⭐⭐⭐⭐
   - You implied: Should be higher priority
   - Time: 1-2 weeks
   - Why: Integrated experience, no external tools needed
   - Impact: 10x better UX than reveal.js

**Features**:
- Split-pane: markdown on left, live preview on right
- Syntax highlighting
- Auto-save to localStorage
- File import/export
- Simple and fast

**This is the differentiator** - no other tool has this integrated.

---

### TIER 3: Polish & Customization (NICE TO HAVE)
**Timeline**: Month 2

6. **Simple Theme Support** ⭐⭐⭐
   - You said: Important, but just make CSS editable
   - Time: 2-3 days
   - Why: Easy customization without complexity
   - Approach:
     - Export current CSS as template
     - Let users edit CSS file directly
     - Hot reload styles in dev mode
     - No "theme system", just CSS files

7. **More Transitions** ⭐⭐⭐
   - You said: Good, but lower than editor
   - Time: 2 days
   - Why: Visual variety
   - Focus: Fade, zoom (most useful)

8. **Auto-Animate** ⭐⭐⭐
   - Time: 5-6 days
   - Why: Smooth element transitions
   - Impact: "Wow" factor

---

### TIER 4: Future/Optional
**Timeline**: Month 3+

9. **PDF Export**
   - You said: Not important now, 12+
   - Move to later

10. **Code Line Highlighting**
    - You said: Not important
    - Skip or defer

11. **AI Features**
    - High impact but complex
    - Month 4+

12. **Collaboration**
    - Complex, long-term

---

## 📋 Revised 2-Week Sprint Plan

### Week 1: Core Features

**Day 1-2**: Responsive Design
- Mobile-friendly layouts
- Responsive font sizing
- Touch-friendly TOC
- Test on various screen sizes
- **Deliverable**: Works great on mobile/tablet

**Day 3-5**: Speaker Notes View
- Separate presenter window
- Current slide + next slide preview
- Speaker notes display
- Timer
- Sync between windows
- **Deliverable**: Can give real presentations

**Weekend**: Test & polish

---

### Week 2: Professional Features

**Day 1-2**: Overview Mode
- Grid layout of all slides
- Click to navigate
- Keyboard shortcut (O)
- Highlight current slide
- **Deliverable**: Easy navigation & deck overview

**Day 3**: Fullscreen Mode
- Native fullscreen API
- Keyboard shortcut (F)
- Exit on Esc
- **Deliverable**: Professional presentation mode

**Day 4-5**: Bug fixes, testing, documentation

**Result**: **v2.1 - Production Ready** 🎉

---

### Weeks 3-4: The Game Changer

**Week 3-4**: Markdown Editor
- Split-pane layout
- CodeMirror or Monaco editor
- Live preview
- Auto-save
- File import/export
- Basic templates

**Result**: **v2.5 - Integrated Experience** 🚀

This is where we become **better than reveal.js**.

---

## 🎨 Simple Theme Approach

Instead of a complex "theme system", just:

1. **Export CSS Template**
   ```bash
   slidedown export-theme my-theme.css
   ```

2. **User Edits CSS**
   - Change colors, fonts, spacing
   - Full control via CSS variables
   - No UI needed

3. **Load Custom Theme**
   ```markdown
   <!-- theme: my-theme.css -->
   ```

**Benefits**:
- Simple to implement (2 days vs 5 days)
- More powerful (full CSS control)
- No complex UI needed
- Developers love it

**Example CSS Template**:
```css
:root {
  /* Colors */
  --primary: #3b82f6;
  --background: #1f2937;
  --text: #ffffff;

  /* Fonts */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --slide-padding: 4rem;
}
```

Users just edit these values. Done.

---

## 💡 Why This Roadmap is Better

### Focus on Core Value
- **Week 1-2**: Production-ready tool (can actually use it)
- **Week 3-4**: Game-changing feature (editor)
- **Month 2+**: Polish and extras

### Avoiding Complexity
- No complex theme system → Simple CSS files
- No touch gestures library → Just responsive design
- No code highlighting → Focus on what matters

### Biggest Differentiation
- **Editor** is the killer feature
- reveal.js doesn't have this
- Makes creating presentations 10x easier

---

## 🎯 The Real Question

**What's the primary use case?**

### Option A: Live Presentations
**Priority**: Speaker View → Overview → Fullscreen → Responsive
**Result**: Can give great presentations
**Timeline**: 2 weeks

### Option B: Content Creation
**Priority**: Editor → Simple Themes → Live Preview → Templates
**Result**: Easy to create decks
**Timeline**: 3-4 weeks

### Option C: Best of Both (Recommended)
**Week 1-2**: Core presentation features (A)
**Week 3-4**: Editor (B)
**Result**: Complete solution
**Timeline**: 4 weeks

---

## 📊 Comparison After Each Phase

| Feature | reveal.js | v2.0 (now) | v2.1 (2 weeks) | v2.5 (4 weeks) |
|---------|-----------|------------|----------------|----------------|
| Fragments | ✅ | ✅ | ✅ | ✅ |
| Math | ✅ | ✅ | ✅ | ✅ |
| Speaker View | ✅ | ❌ | ✅ | ✅ |
| Overview | ✅ | ❌ | ✅ | ✅ |
| Mobile | ⚠️ | ⚠️ | ✅ | ✅ |
| **Editor** | ❌ | ❌ | ❌ | ✅ |
| **Parity** | 100% | 85% | 95% | **110%** |

After v2.5, we're **ahead** of reveal.js!

---

## 🚀 Immediate Next Steps

### Do You Want:

**A) Production-Ready First** (Conservative)
- Build: Speaker View, Overview, Fullscreen, Responsive
- Timeline: 2 weeks
- Then: Decide on editor

**B) Editor First** (Aggressive)
- Build: Editor with basic features
- Timeline: 2-3 weeks
- Then: Add speaker view, overview

**C) Balanced Approach** (Recommended)
- Week 1-2: Core features (speaker, overview, responsive)
- Week 3-4: Editor
- Timeline: 4 weeks
- Result: Complete solution

---

## 💭 Discussion Points

### 1. Responsive Design Scope

**Basic** (2 days):
- Responsive font sizes
- Mobile-friendly TOC
- Touch-friendly navigation buttons
- Works on 320px - 1920px screens

**Advanced** (5 days):
- Slide layout adapts to screen size
- Vertical on mobile, horizontal on desktop
- Different content layouts for mobile
- Mobile-specific slide variants

**Recommendation**: Start with Basic, iterate based on feedback.

---

### 2. Speaker View Implementation

**Option A: Separate Window** (Simpler)
- window.open() for presenter view
- postMessage for sync
- Works everywhere
- Time: 3 days

**Option B: Dual Monitor** (Nicer)
- Detect second monitor
- Auto-position on second screen
- Fallback to window
- Time: 5 days

**Recommendation**: Option A, works for everyone.

---

### 3. Editor Approach

**Option A: Simple** (2 weeks)
- Textarea with syntax highlighting
- Live preview
- localStorage only
- Import/export markdown files

**Option B: Full-Featured** (4 weeks)
- Monaco Editor (VS Code)
- File browser
- Multiple presentations
- Cloud sync option

**Recommendation**: Option A first, iterate.

---

### 4. Theme System

**Your Preference**: Edit style files directly

**My Proposal**:
```
/themes
  /default.css      (current Tailwind styles)
  /light.css        (light theme)
  /minimal.css      (minimal theme)
  /custom.css       (user's custom theme)
```

**Usage**:
```markdown
<!-- theme: custom -->
```

**Implementation**:
- Export CSS variables from index.css
- Load theme CSS dynamically
- Override variables
- Hot reload in dev mode

**Time**: 2-3 days
**No UI needed**: Users edit CSS files directly

Sound good?

---

## 🎯 My Recommended Path Forward

### Phase 1: Production-Ready (2 Weeks)
1. **Week 1, Days 1-2**: Responsive Design
2. **Week 1, Days 3-5**: Speaker Notes View
3. **Week 2, Days 1-2**: Overview Mode
4. **Week 2, Day 3**: Fullscreen Mode
5. **Week 2, Days 4-5**: Testing & polish

**Release v2.1** - Can give real presentations!

---

### Phase 2: Game Changer (2 Weeks)
6. **Week 3-4**: Markdown Editor
   - Split-pane layout
   - Live preview
   - Auto-save
   - Import/export

**Release v2.5** - Better than reveal.js!

---

### Phase 3: Polish (1-2 Weeks)
7. **Days 1-3**: Simple CSS Theme System
8. **Days 4-5**: More Transitions (fade, zoom)
9. **Days 6-10**: Auto-animate (optional)

**Release v3.0** - Complete solution!

---

## 🤔 Questions for You

1. **Do you agree with the Tier 1 priorities?**
   - Speaker View
   - Overview Mode
   - Responsive Design
   - Fullscreen

2. **Should we do editor before or after Tier 1?**
   - Option A: Tier 1 first (safe, production-ready)
   - Option B: Editor first (bold, unique feature)
   - Option C: Both together (ambitious)

3. **For themes, is "edit CSS files" approach good?**
   - Or do you want a UI theme picker?

4. **What's the primary use case?**
   - Creating presentations (editor is critical)
   - Giving presentations (speaker view is critical)
   - Both equally

5. **What about PDF export?**
   - You said "12+" - confirm we skip for now?

---

## 📝 Summary

**Removed from roadmap**:
- ❌ Touch gestures (replaced with responsive design)
- ❌ Code line highlighting (not important)
- ❌ PDF export (moved to 12+)
- ❌ Complex theme system (replaced with simple CSS)

**Elevated in priority**:
- ⬆️ Markdown Editor (Tier 2 → should be higher)
- ⬆️ Responsive Design (new addition, Tier 1)

**Kept as top priority**:
- ✅ Speaker Notes View (Tier 1)
- ✅ Overview Mode (Tier 1)
- ✅ Fullscreen Mode (Tier 1)

**Simplified**:
- 🔧 Themes → Just CSS file editing

**Next decision**:
Do we build Tier 1 first (production-ready in 2 weeks) or jump to editor (unique feature)?

---

**What do you think? Which path makes most sense for your goals?**
