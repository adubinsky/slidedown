# Built-in Tutorial System

Converting "test content" into a comprehensive tutorial and example gallery.

## Concept

Instead of hidden "test" files, create an interactive tutorial system that helps users learn Slidedown by exploring real presentations.

## Current State

**What we have:**
- `?test=new-syntax-demo` - Feature showcase
- `?test=flyio-demo` - Deployment guide
- Sample markdown in App.jsx

**Issues:**
- Called "test" (implies debugging, not learning)
- Hidden from new users
- No discoverability
- No progressive learning path

## Proposed System

### 1. Rename Parameter

**Option A:** `?tutorial=` (learning focused)
```
?tutorial=getting-started
?tutorial=advanced-animations
?tutorial=business-presentations
```

**Option B:** `?example=` (showcase focused)
```
?example=startup-pitch
?example=technical-deep-dive
?example=educational-lecture
```

**Recommendation:** Use both!
- `?tutorial=` for step-by-step learning
- `?example=` for real-world templates

### 2. Tutorial Categories

**Basics (Progressive Learning):**
1. `getting-started` - First presentation, basic syntax
2. `backgrounds-and-colors` - Using `:::` directives
3. `fragments-and-animations` - Symbol syntax (`^^^`, `vvv`)
4. `advanced-layouts` - Tables, columns, complex content
5. `math-and-code` - Technical presentations

**By Use Case (Templates):**
1. `startup-pitch` - Investor presentation template
2. `sales-demo` - Product demo template
3. `conference-talk` - Technical conference template
4. `educational-lecture` - Academic/training template
5. `quarterly-review` - Business update template
6. `portfolio-showcase` - Creative work template

**Advanced:**
1. `vertical-navigation` - Hierarchical slides
2. `interactive-elements` - Links, embeds, actions
3. `branding-and-themes` - Custom styling
4. `deployment-guide` - Fly.io and beyond

### 3. Tutorial Features

Each tutorial should include:

**In-slide learning:**
```markdown
## Using Fragments

Fragments reveal content progressively:

- >> First, text appears
- ^^^ Then it animates UP
- vvv Or DOWN
- ---> Or from the RIGHT

**Try it:** Press → or Space to see each item reveal

---

## How It Works

The markdown for the previous slide:

\`\`\`markdown
- >> First, text appears
- ^^^ Then it animates UP
\`\`\`

See how simple that is? No HTML, just symbols!
```

**Editable examples:**
- Link to edit the markdown source
- "Fork this example" button
- "Download as template" option

**Progressive disclosure:**
- Start simple (title + bullets)
- Build complexity (backgrounds)
- Add animations
- Show advanced features

### 4. Tutorial Gallery Page

Landing page at `?tutorials` or `?examples`:

```markdown
# Slidedown Tutorials & Examples

## 🎓 Learn Slidedown

**Start Here:**
- Getting Started (5 minutes)
- Backgrounds & Colors (3 minutes)
- Fragments & Animations (5 minutes)

**Go Deeper:**
- Advanced Layouts
- Math & Code
- Vertical Navigation

## 📋 Templates by Use Case

**Business:**
- Startup Pitch Deck
- Sales Demo
- Quarterly Review

**Technical:**
- Conference Talk
- Technical Deep Dive
- Workshop Presentation

**Academic:**
- Educational Lecture
- Research Presentation
- Thesis Defense

**Creative:**
- Portfolio Showcase
- Design Review
- Creative Brief

## 🚀 Deployment

- Deploying to Fly.io
- Custom Domains
- CI/CD Setup
```

### 5. Implementation Plan

**Phase 1: Rename & Reorganize**
- Rename `/test-content/` to `/tutorials/`
- Add `/examples/` folder for templates
- Update App.jsx to support both `?tutorial=` and `?example=`
- Keep backward compatibility with `?test=` (redirect)

**Phase 2: Create Tutorial Content**
- Write 5 core tutorials (getting started → advanced)
- Create 6 template examples (business, technical, academic)
- Each with clear learning objectives

**Phase 3: Gallery Interface**
- Create tutorial gallery page
- Category navigation
- Search/filter by topic
- Preview thumbnails

**Phase 4: Interactive Features**
- "Edit this example" button → opens in new tab with editable markdown
- Download template as `.md` file
- "Start from this template" → copies to `/presentations/`
- Share tutorial URL

### 6. File Structure

```
app/src/
├── tutorials/              # Learning content
│   ├── getting-started.md
│   ├── backgrounds.md
│   ├── fragments.md
│   ├── advanced-layouts.md
│   ├── math-and-code.md
│   └── vertical-navigation.md
├── examples/               # Real-world templates
│   ├── startup-pitch.md
│   ├── sales-demo.md
│   ├── conference-talk.md
│   ├── quarterly-review.md
│   ├── educational-lecture.md
│   └── portfolio-showcase.md
└── gallery.md              # Tutorial gallery page
```

### 7. User Journey

**New User:**
1. Opens Slidedown → sees gallery or default tutorial
2. Clicks "Getting Started" tutorial
3. Goes through 5-minute introduction
4. Picks a template matching their use case
5. Edits it in `/presentations/presentation.md`
6. Deploys to Fly.io

**Experienced User:**
1. Browses example gallery
2. Finds "Quarterly Review" template
3. Downloads as starting point
4. Customizes for their needs
5. Shares with team

### 8. Marketing Benefits

**Instead of:**
> "Slidedown is a markdown presentation tool with test files"

**We can say:**
> "Slidedown includes 15+ interactive tutorials and real-world templates. Learn by doing, then customize for your needs."

**SEO Keywords:**
- presentation templates
- markdown tutorial
- pitch deck template
- technical presentation guide
- business presentation examples

### 9. Future Enhancements

**Community Gallery:**
- Users can submit their presentations
- Curated collection of best examples
- Voting/favorites system

**AI-Powered Tutorials:**
- MCP integration: "Create a tutorial about [topic]"
- Personalized learning paths
- Generate custom templates

**Interactive Playground:**
- Split-pane editor
- Live preview as you type
- "Try this feature" interactive widgets

## Implementation Priority

**High Priority (Tier 1):**
- ✅ Rename concept from "test" to "tutorial/example"
- ✅ Add to roadmap
- Create 3 core tutorials (getting-started, backgrounds, fragments)
- Create 3 template examples (business, technical, creative)
- Update App.jsx to support `?tutorial=` and `?example=`

**Medium Priority (Tier 2):**
- Gallery page
- Remaining tutorials and templates
- Download/copy functionality

**Future (Tier 3+):**
- Community submissions
- Interactive playground
- AI-powered generation

## Success Metrics

- New user onboarding time (target: <10 minutes to first presentation)
- Template usage (% of users starting from template vs blank)
- Tutorial completion rate
- Example downloads
- User feedback on learning experience

---

**This transforms Slidedown from a tool into a learning platform.**
