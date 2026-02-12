# Slidedown 2.0 Roadmap

**Current Version**: 2.0-stable (95% feature parity with reveal.js)
**Last Updated**: 2026-02-11

## 🎉 Recently Completed (February 2026)

### Major Features
- ✅ **New Markdown-Native Syntax** - `:::` directives and symbol-based fragments (`^^^`, `vvv`, etc.)
- ✅ **MCP Server** - 7 tools for Claude integration (read, write, create, serve, build, config, help)
- ✅ **CLI Tool** - Commands for init, serve, build, and config
- ✅ **Settings System** - slidedown.config.json for branding, themes, and defaults
- ✅ **Company Branding** - Logo support with positioning and sizing
- ✅ **Background Opacity** - Image backgrounds with adjustable transparency
- ✅ **Mouse Wheel Navigation** - Natural scrolling through slides
- ✅ **Inline Fragments** - Wrap text with symbols for progressive reveal

### Documentation
- ✅ Comprehensive README with new syntax examples
- ✅ MCP-CLI-GUIDE.md with complete usage instructions
- ✅ Enhanced MCP server with AI collaboration guide
- ✅ 6 complete example patterns for AI-generated presentations

### Developer Experience
- ✅ Hot module replacement (HMR) for instant updates
- ✅ Production build optimization
- ✅ Clean, production-ready codebase (no debug logs)
- ✅ Improved code visibility on image backgrounds
- ✅ Simple `/presentations/` folder for default content (no deep nesting)

### Example Content (Foundation for Tutorials)
- ✅ `new-syntax-demo.md` - Feature showcase
- ✅ `flyio-demo.md` - Deployment guide
- ✅ Parameter system: `?test=filename` loads examples
- 🚧 Convert to full tutorial system (Tier 1 priority)

## Current Features (v2.0-stable)

### Core Presentation Engine
- ✅ Custom React renderer (no reveal.js dependency)
- ✅ Fragment animations (12+ types with symbol syntax)
- ✅ Math rendering (KaTeX/LaTeX)
- ✅ Custom slide backgrounds (colors, images, gradients, opacity)
- ✅ All markdown elements (GFM, tables, definition lists)
- ✅ Interactive TOC sidebar
- ✅ Keyboard navigation (arrows, space, page up/down, home/end)
- ✅ Mouse wheel navigation
- ✅ Vertical slides (hierarchical organization)
- ✅ Code syntax highlighting (100+ languages)

### New Markdown-Native Syntax (2.0 Exclusive!)
- ✅ `:::` slide directives (no HTML comments needed)
- ✅ Symbol-based fragments (`^^^`, `vvv`, `--->`, `<---`, `+++`, `...`, `~~~`)
- ✅ Inline fragments with surrounding markers
- ✅ Background opacity control for images
- ✅ Gradient backgrounds
- ✅ Fully backward compatible with HTML comment syntax

### Developer Tools
- ✅ **MCP Server** for Claude integration (7 tools)
- ✅ **CLI Tool** (init, serve, build, config commands)
- ✅ Settings/config system (slidedown.config.json)
- ✅ Company branding support (logo, colors, fonts)
- ✅ Hot module replacement (HMR) for live editing
- ✅ Production build optimization

## Planned Features

### Tier 1: Enhanced Markdown Features (NEXT - Weeks 1-2)

Build on the new syntax foundation:

1. **Built-in Tutorials & Examples** ⭐⭐⭐⭐⭐ (IN PROGRESS)
   - Interactive tutorials teaching Slidedown syntax
   - Rename `?test=` to `?tutorial=` or `?example=`
   - Gallery of example presentations by use case
   - "Learn by doing" approach with editable examples
   - Categories: syntax-basics, business, technical, academic
   - Each tutorial demonstrates specific features progressively

2. **Footnotes Support** ⭐⭐⭐⭐
   - GFM footnote syntax (`[^1]`, `[^1]: text`)
   - Automatic footnote numbering
   - Click to jump between reference and note
   - Plugin: `remark-footnotes`

3. **Mermaid Diagrams** ⭐⭐⭐⭐⭐
   - Flowcharts, sequence diagrams, gantt charts
   - Embedded in markdown with ```mermaid blocks
   - Essential for technical presentations
   - Plugin: `rehype-mermaid`

4. **More Animations & Transitions** ⭐⭐⭐⭐
   - Additional fragment animations (rotate, bounce, flip)
   - Slide transitions (fade, zoom, cube, page)
   - Per-slide transition control
   - Staggered animations for lists

5. **Enhanced Media Embedding** ⭐⭐⭐
   - Video embeds (YouTube, Vimeo, local)
   - Audio support
   - iframes for interactive content
   - Better image controls (size, alignment, captions)

### Tier 2: Professional Features (Weeks 3-4)

Essential for production presentations:

5. **Speaker Notes View** ⭐⭐⭐⭐⭐
   - Separate presenter window with current/next slide
   - Speaker notes display
   - Timer and slide counter
   - Window sync between presenter and audience views

6. **Overview Mode** ⭐⭐⭐⭐⭐
   - Grid layout of all slides
   - Click to navigate to any slide
   - Visual overview of entire presentation
   - Keyboard shortcut (O)

7. **Responsive Design** ⭐⭐⭐⭐
   - Mobile-friendly layouts
   - Responsive font sizing
   - Touch-friendly navigation
   - Works on all screen sizes (320px - 4K)

8. **Fullscreen Mode** ⭐⭐⭐
   - Native fullscreen API
   - Keyboard shortcut (F)
   - Professional presentation mode

### Tier 3: Advanced Tools (Month 2+)

Features that differentiate Slidedown from reveal.js:

9. **Integrated Markdown Editor** ⭐⭐⭐⭐⭐
   - Built-in code editor (CodeMirror)
   - Live preview split-pane
   - Auto-save to localStorage
   - File import/export
   - Syntax highlighting for markdown
   - No external tools required

### Tier 4: Customization & Polish

Additional features for power users:

10. **Enhanced Theme System** ⭐⭐⭐
    - Export CSS template
    - Direct CSS file editing
    - CSS variables for easy customization
    - Multiple pre-built themes
    - Hot reload in dev mode

11. **Auto-Animate** ⭐⭐⭐
    - Smooth element transitions between slides
    - Automatic position/size morphing
    - Enhanced visual effects

12. **Code Line Highlighting** ⭐⭐⭐
    - Highlight specific lines in code blocks
    - Step through code explanations
    - Diff highlighting for changes

### Tier 5: Future Enhancements

Long-term features:

13. **PDF Export**
    - Export presentations to PDF
    - Print-friendly layouts
    - Speaker notes included option

14. **Drawing & Shapes** ⭐⭐
    - Built-in shape library (arrows, boxes, circles)
    - Drawing tools for annotations
    - Diagrams without external tools

15. **AI-Powered Features** ⭐⭐⭐⭐
    - ✅ AI-assisted slide generation (via MCP server)
    - Content suggestions and improvements
    - Layout recommendations
    - Automatic image suggestions

16. **Collaboration**
    - Real-time collaborative editing
    - Comments and feedback
    - Version control integration
    - Share presentations with view-only links

## Development Timeline

### ✅ Phase 0: Foundation Complete (Feb 2026)
**COMPLETED - v2.0-stable:**
- Custom React renderer
- New markdown-native syntax (`:::`, `^^^`, etc.)
- MCP server for Claude integration
- CLI tool (init, serve, build, config)
- Settings/config system
- Company branding support
- Background opacity and gradients
- Mouse wheel navigation
- Hot module replacement

**Achievement**: 95% feature parity with reveal.js + unique differentiation

### Phase 1: Enhanced Content (Weeks 1-2)
**Target: v2.1 - Content Excellence**

Focus on rich content features:
- Footnotes support
- Mermaid diagrams
- More animations & transitions
- Enhanced media embedding (video, audio, iframes)

**Deliverable**: Best markdown presentation tool for technical content

### Phase 2: Professional Features (Weeks 3-4)
**Target: v2.2 - Presentation Ready**

Essential professional features:
- Speaker notes view
- Overview mode (grid view)
- Responsive design (mobile-friendly)
- Fullscreen mode

**Deliverable**: Production-ready for professional presentations

### Phase 3: Advanced Tools (Month 2+)
**Target: v2.5 - Better than reveal.js**

Differentiation features:
- Integrated markdown editor with live preview
- Enhanced theme system
- Auto-animate between slides
- Code line highlighting
- Drawing & shapes

**Deliverable**: Complete presentation solution, superior to alternatives

### Phase 4: Polish & Scale (Ongoing)
**Target: v3.0 - Complete Platform**

Long-term features:
- PDF export
- Real-time collaboration
- AI-powered enhancements
- Community themes and plugins

**Deliverable**: Industry-leading presentation platform

## Feature Comparison

| Feature | reveal.js | v2.0-stable (NOW) | v2.1 (planned) | v2.5 (planned) |
|---------|-----------|-------------------|----------------|----------------|
| **Fragments** | ✅ HTML | ✅ **Symbols** | ✅ **+ More** | ✅ |
| **Math** | ✅ | ✅ KaTeX | ✅ | ✅ |
| **Backgrounds** | ✅ HTML | ✅ **::: Syntax** | ✅ | ✅ |
| **Code Highlight** | ✅ | ✅ 100+ langs | ✅ | ✅ **+ Lines** |
| **Diagrams** | ❌ | ❌ | ✅ **Mermaid** | ✅ |
| **Footnotes** | ❌ | ❌ | ✅ | ✅ |
| Speaker View | ✅ | ❌ | ✅ | ✅ |
| Overview | ✅ | ❌ | ❌ | ✅ |
| Mobile | ⚠️ | ⚠️ | ✅ | ✅ |
| **MCP/CLI** | ❌ | ✅ **NEW!** | ✅ | ✅ |
| **Editor** | ❌ | ❌ | ❌ | ✅ **Built-in** |
| **Config System** | ❌ | ✅ **NEW!** | ✅ | ✅ |
| **AI Integration** | ❌ | ✅ **Claude** | ✅ | ✅ |
| | | | | |
| **Feature Parity** | 100% | **95%** | **100%** | **120%** |

**Legend:**
- ✅ = Fully supported
- ⚠️ = Partial support
- ❌ = Not available
- **Bold** = Slidedown exclusive or superior implementation

## Contributing

Interested in contributing? Check out the [issues page](https://github.com/adubinsky/slidedown/issues) or reach out to discuss features and priorities.

## Feedback

Have thoughts on the roadmap? Open an issue or discussion on GitHub to share your input.
