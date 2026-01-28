# Slidedown 2.0 Roadmap

**Current Version**: 2.0-beta (85% feature parity with reveal.js)
**Last Updated**: 2026-01-28

## Current Features (v2.0-beta)

- ✅ Custom React renderer
- ✅ Fragment animations (12+ types)
- ✅ Math rendering (KaTeX/LaTeX)
- ✅ Custom slide backgrounds
- ✅ All markdown elements
- ✅ Interactive TOC sidebar
- ✅ Keyboard navigation
- ✅ Vertical slides
- ✅ Code syntax highlighting

## Planned Features

### Tier 1: Core Presentation Features

Essential features for production-ready presentations:

1. **Speaker Notes View** ⭐⭐⭐⭐⭐
   - Separate presenter window with current/next slide
   - Speaker notes display
   - Timer and slide counter
   - Window sync between presenter and audience views

2. **Overview Mode** ⭐⭐⭐⭐⭐
   - Grid layout of all slides
   - Click to navigate to any slide
   - Visual overview of entire presentation
   - Keyboard shortcut (O)

3. **Responsive Design** ⭐⭐⭐⭐
   - Mobile-friendly layouts
   - Responsive font sizing
   - Touch-friendly navigation
   - Works on all screen sizes (320px - 4K)

4. **Fullscreen Mode** ⭐⭐⭐
   - Native fullscreen API
   - Keyboard shortcut (F)
   - Professional presentation mode

### Tier 2: Enhanced Experience

Features that differentiate Slidedown from reveal.js:

5. **Integrated Markdown Editor** ⭐⭐⭐⭐⭐
   - Built-in code editor (CodeMirror)
   - Live preview
   - Auto-save to localStorage
   - File import/export
   - Syntax highlighting for markdown
   - No external tools required

### Tier 3: Customization & Polish

Additional features for power users:

6. **Simple Theme System** ⭐⭐⭐
   - Export CSS template
   - Direct CSS file editing
   - CSS variables for easy customization
   - Hot reload in dev mode

7. **More Transitions** ⭐⭐⭐
   - Fade, zoom, slide transitions
   - Per-slide transition control
   - Smooth animations

8. **Auto-Animate** ⭐⭐⭐
   - Smooth element transitions between slides
   - Automatic position/size morphing
   - Enhanced visual effects

### Tier 4: Future Enhancements

Long-term features:

9. **PDF Export**
   - Export presentations to PDF
   - Print-friendly layouts

10. **Code Line Highlighting**
    - Highlight specific lines in code blocks
    - Step through code explanations

11. **AI-Powered Features**
    - AI-assisted slide generation
    - Content suggestions
    - Layout recommendations

12. **Collaboration**
    - Real-time collaborative editing
    - Comments and feedback
    - Version control integration

## Development Timeline

### Phase 1: Production-Ready (2-3 weeks)
Focus on making Slidedown viable for real presentations:
- Speaker notes view
- Overview mode
- Responsive design
- Fullscreen mode

**Target**: v2.1 - Production Ready

### Phase 2: Differentiation (2-3 weeks)
Add features that make Slidedown better than alternatives:
- Integrated markdown editor
- Enhanced user experience

**Target**: v2.5 - Better than reveal.js

### Phase 3: Polish (Ongoing)
- Theme system
- Additional transitions
- Auto-animate
- Community-requested features

**Target**: v3.0 - Complete solution

## Feature Comparison

| Feature | reveal.js | v2.0 (now) | v2.1 (planned) | v2.5 (planned) |
|---------|-----------|------------|----------------|----------------|
| Fragments | ✅ | ✅ | ✅ | ✅ |
| Math | ✅ | ✅ | ✅ | ✅ |
| Speaker View | ✅ | ❌ | ✅ | ✅ |
| Overview | ✅ | ❌ | ✅ | ✅ |
| Mobile | ⚠️ | ⚠️ | ✅ | ✅ |
| **Editor** | ❌ | ❌ | ❌ | ✅ |
| **Parity** | 100% | 85% | 95% | **110%** |

## Contributing

Interested in contributing? Check out the [issues page](https://github.com/adubinsky/slidedown/issues) or reach out to discuss features and priorities.

## Feedback

Have thoughts on the roadmap? Open an issue or discussion on GitHub to share your input.
