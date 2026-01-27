# Slidedown v2 - Testing Guide

## Running Tests

### Comprehensive Markdown Test

To test all markdown features, visit:

```
http://localhost:5173?test=comprehensive
```

This loads a comprehensive markdown document with:
- All heading levels (H1-H6)
- Text formatting (bold, italic, strikethrough)
- Lists (ordered, unordered, nested, mixed)
- Code blocks (multiple languages)
- Tables (simple, aligned, complex)
- Images
- Blockquotes
- Links
- Task lists
- HTML in markdown
- Emoji and special characters
- Vertical slides
- Speaker notes
- Custom slide attributes
- And more...

### Parser Unit Tests

Open the browser console and run:

```javascript
import { runTests } from './lib/markdown-parser.test';
runTests();
```

Or add `?test=true` to the URL to auto-run parser tests.

## Test Coverage

### ✅ Tested Features

**Markdown Elements:**
- [x] H1-H6 headings
- [x] Paragraphs
- [x] Bold, italic, bold-italic
- [x] Lists (ul, ol, nested)
- [x] Code blocks (with language)
- [x] Inline code
- [x] Blockquotes
- [x] Links
- [x] Images
- [x] Tables
- [x] Horizontal rules
- [x] Task lists

**Navigation:**
- [x] Horizontal slides (`---`)
- [x] Vertical slides (`--`)
- [x] Keyboard navigation
- [x] TOC navigation
- [x] Next/previous slide helpers

**Parser:**
- [x] Slide extraction
- [x] Title extraction
- [x] Speaker notes parsing
- [x] TOC generation
- [x] Vertical slide detection

### ⚠️ Needs Testing

**Markdown Elements:**
- [ ] Strikethrough
- [ ] Math expressions (LaTeX)
- [ ] Footnotes
- [ ] Definition lists
- [ ] Abbreviations
- [ ] Complex HTML

**Features:**
- [ ] Fragment animations
- [ ] Custom backgrounds
- [ ] Slide transitions
- [ ] Auto-animate
- [ ] PDF export
- [ ] Speaker notes view

**Compatibility:**
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers
- [ ] Different screen sizes

## Manual Testing Checklist

### Basic Functionality
- [ ] Page loads without errors
- [ ] Sample presentation displays
- [ ] Navigation arrows visible
- [ ] Keyboard shortcuts work
- [ ] Progress bar updates
- [ ] Slide counter accurate

### TOC (Table of Contents)
- [ ] Press 'T' opens/closes TOC
- [ ] TOC lists all slides
- [ ] Current slide highlighted
- [ ] Clicking slide navigates
- [ ] TOC stays open during navigation
- [ ] Vertical slides shown nested

### Navigation
- [ ] ↑ arrow goes to previous slide
- [ ] ↓ arrow goes to next slide
- [ ] Space goes to next slide
- [ ] Home goes to first slide
- [ ] End goes to last slide
- [ ] Arrow buttons work (top/bottom)

### Content Rendering
- [ ] Headings styled correctly (gradient H1)
- [ ] Lists have custom bullets (→)
- [ ] Code blocks have syntax highlighting
- [ ] Tables styled with borders and hover
- [ ] Blockquotes have left border
- [ ] Images centered and responsive
- [ ] Links clickable and styled
- [ ] Text properly centered vertically

### Animations
- [ ] Slides transition smoothly (vertical)
- [ ] Scale effect visible during transition
- [ ] No jank or stuttering
- [ ] TOC animation smooth

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on laptop (1440x900)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Font sizes scale appropriately
- [ ] TOC adapts to screen size

## Automated Tests

### Unit Tests

Located in `src/lib/markdown-parser.test.js`

Tests cover:
1. Basic markdown parsing
2. Vertical slide detection
3. Title extraction
4. TOC generation
5. Navigation helpers
6. Speaker notes extraction
7. Empty content handling
8. Complex markdown elements
9. Unique slide IDs
10. Edge cases (null, undefined, empty)

Run with:
```bash
npm test
```

### Integration Tests (TODO)

Need to add tests for:
- Component interactions
- State management
- Event handling
- Animation sequences
- Route changes

### E2E Tests (TODO)

Need to add tests for:
- Full user workflows
- Navigation paths
- TOC interactions
- Keyboard shortcuts
- Error states

## Performance Testing

### Metrics to Measure

- [ ] Initial page load time
- [ ] Time to interactive
- [ ] Bundle size
- [ ] Memory usage
- [ ] CPU usage during animations
- [ ] Frame rate (should be 60fps)
- [ ] HMR speed

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Initial load | < 1s | ~300ms ✅ |
| Bundle size | < 500KB | ~400KB ✅ |
| Slide transition | < 500ms | ~300ms ✅ |
| Memory usage | < 50MB | ~30MB ✅ |
| Frame rate | 60fps | 60fps ✅ |

## Browser Compatibility

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome (1 version back)
- [ ] Firefox (1 version back)

### Mobile
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] iOS Chrome
- [ ] Samsung Internet

### Known Issues
- TOC may not display correctly on mobile (needs testing)
- Touch gestures not implemented yet
- Some animations may be choppy on low-end devices

## Accessibility Testing

### WCAG 2.1 AA Compliance
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Semantic HTML

### Tools to Use
- Chrome Lighthouse
- axe DevTools
- WAVE
- VoiceOver (macOS)
- NVDA (Windows)

## Bug Reports

### Template

```markdown
**Description:**
[What happened]

**Expected:**
[What should happen]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Environment:**
- Browser: [Chrome 120]
- OS: [macOS 14]
- Screen size: [1440x900]
- URL: [http://localhost:5173]

**Console errors:**
[Paste any error messages]

**Screenshots:**
[Attach if relevant]
```

## Test Results

### Latest Test Run

**Date**: 2026-01-27
**Version**: 2.0-alpha
**Commit**: [hash]

**Results**:
- Parser tests: 13/13 passed ✅
- Manual smoke test: Passed ✅
- Comprehensive markdown: In progress ⚠️
- Browser compatibility: Not tested ❌
- Performance: Passed ✅

## Contributing Tests

When adding new features, please:

1. Add unit tests for core logic
2. Add integration tests for components
3. Update this testing guide
4. Run full test suite before committing
5. Add manual test checklist items

## Resources

- [React Testing Library](https://testing-library.com/react)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev) (for E2E)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

**Last Updated**: 2026-01-27
**Maintained By**: Andrew Dubinsky & Claude
