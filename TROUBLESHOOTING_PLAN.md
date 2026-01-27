# Slidedown v2 - Troubleshooting Plan

**Date**: 2026-01-27
**Status**: Action Required
**Priority**: High

This document provides a comprehensive plan to fix all rendering issues identified in the comprehensive test.

---

## Executive Summary

**Total Issues Found**: 9
**Root Causes Identified**: 5 categories
1. Missing plugins (Math, Definition lists, Abbreviations)
2. CSS rendering issues (Horizontal rules)
3. Unimplemented features (Fragments, Custom backgrounds)
4. Broken test content (Images)
5. HTML attribute parsing (data-* attributes)

**Estimated Time to Fix**: 1-2 weeks
**Priority Order**: Fragments → Backgrounds → Math → HR → Definition Lists → Abbreviations → Images

---

## Issue Analysis

### Issue 1: Images Not Displaying (Slide 8/52)

**Screenshot Evidence**: Image slide shows caption but no actual image

**Root Cause**: Likely broken image URL in test content
- Type: Content Issue
- Severity: Low (test content only)
- Impact: Does not affect core functionality

**Diagnosis Steps**:
1. Read comprehensive-example.md and check image URLs
2. Verify if URLs are placeholder text or actual broken links
3. Test with valid image URLs

**Proposed Fix**:
```markdown
# Replace placeholder URLs with actual images
![Sample Image](https://picsum.photos/800/400)
![Another Image](https://via.placeholder.com/800x400)
```

**Implementation**:
- File: `/app/src/test-content/comprehensive-example.md`
- Time: 5 minutes
- Priority: Low

---

### Issue 2: Horizontal Rules Not Visible (Slide 17/52)

**Screenshot Evidence**: Text shows but no visible horizontal line

**Root Cause**: CSS styling issue
- Type: Style/CSS Issue
- Severity: Low
- Impact: Visual element not rendering

**Diagnosis Steps**:
1. Check if `<hr>` element is in DOM (inspect element)
2. Check current CSS for `hr` elements
3. Verify rehype-raw is processing HTML elements

**Current CSS** (from index.css):
```css
.slide-content hr {
  @apply border-t border-gray-600 my-8;
}
```

**Problem**: Border may be too subtle or color blends with background

**Proposed Fix**:
```css
.slide-content hr {
  @apply border-t-2 border-gray-400 my-8;
  opacity: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, #9ca3af, transparent);
  border: none;
}
```

**Implementation**:
- File: `/app/src/index.css`
- Time: 5 minutes
- Priority: Low

---

### Issue 3: Math Expressions Showing Raw LaTeX (Slide 23/52)

**Screenshot Evidence**: `$$E = mc^2$$` and `$\int_0^\infty x^2 dx$` showing as text

**Root Cause**: Missing math rendering plugin
- Type: Missing Feature
- Severity: Medium
- Impact: Math expressions completely non-functional

**Current State**:
- react-markdown does not support math by default
- Need to add remark-math and rehype-katex (or rehype-mathjax)

**Proposed Fix**:

1. Install dependencies:
```bash
npm install remark-math rehype-katex katex
```

2. Update Slide.jsx:
```javascript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS

// In component
<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
>
  {content}
</ReactMarkdown>
```

3. Add KaTeX CSS to index.css or import in main.jsx

**Alternative**: Use rehype-mathjax instead of rehype-katex
- MathJax: Better rendering, slower, larger bundle
- KaTeX: Faster, smaller, slightly limited features

**Recommendation**: Use KaTeX for better performance

**Implementation**:
- Files: `/app/src/components/Slide.jsx`, `/app/src/main.jsx`
- Time: 30 minutes
- Priority: High

---

### Issue 4: Definition Lists Showing Raw Markdown (Slide 24/52)

**Screenshot Evidence**: Definition list syntax visible as plain text

**Root Cause**: Definition lists not supported by GFM
- Type: Missing Feature/Plugin
- Severity: Low
- Impact: Advanced markdown feature unavailable

**Current State**:
- GitHub Flavored Markdown (remark-gfm) does not include definition lists
- Definition lists are not part of CommonMark spec
- Need custom plugin or alternative syntax

**Proposed Solutions**:

**Option 1**: Add remark-deflist plugin
```bash
npm install remark-deflist
```
```javascript
import remarkDeflist from 'remark-deflist';

<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath, remarkDeflist]}
  // ...
>
```

**Option 2**: Document as unsupported and provide HTML alternative
```html
<dl>
  <dt>Term 1</dt>
  <dd>Definition 1</dd>
  <dt>Term 2</dt>
  <dd>Definition 2</dd>
</dl>
```

**Option 3**: Use bold text workaround
```markdown
**Term 1**
: Definition 1

**Term 2**
: Definition 2
```

**Recommendation**: Option 1 (remark-deflist) for best compatibility

**Implementation**:
- Files: `/app/src/components/Slide.jsx`
- Time: 15 minutes
- Priority: Low

---

### Issue 5: Abbreviations Showing Raw Markdown (Slide 26/52)

**Screenshot Evidence**: Abbreviation syntax visible as plain text

**Root Cause**: Abbreviations not supported by GFM
- Type: Missing Feature/Plugin
- Severity: Low
- Impact: Advanced markdown feature unavailable

**Current State**:
- Abbreviations are not part of GFM or CommonMark
- Need custom plugin or alternative syntax

**Proposed Solutions**:

**Option 1**: Add remark-abbr plugin
```bash
npm install remark-abbr
```
```javascript
import remarkAbbr from 'remark-abbr';

<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath, remarkDeflist, remarkAbbr]}
  // ...
>
```

**Option 2**: Document as unsupported and use HTML
```html
<abbr title="HyperText Markup Language">HTML</abbr>
```

**Option 3**: Remove from test content
- Abbreviations are rarely used in presentations
- May not be worth the dependency

**Recommendation**: Option 3 (remove/document as unsupported)
- Abbreviations are edge case for presentations
- Can add later if users request it

**Implementation**:
- Files: `/app/src/test-content/comprehensive-example.md` (remove)
- Documentation: Note in FEATURE_COMPARISON.md
- Time: 5 minutes
- Priority: Very Low

---

### Issue 6 & 7: Fragment Animations Not Working (Slides 42-43/52)

**Screenshot Evidence**:
- Fragment markers showing as arrows (→)
- All fragment content visible at once instead of incremental reveal

**Root Cause**: Fragment system not implemented
- Type: Major Missing Feature
- Severity: High
- Impact: Key presentation feature unavailable

**Current State**:
- Fragments are parsed as regular markdown
- No JavaScript to handle incremental reveal
- reveal.js uses `class="fragment"` with various animation styles

**How Fragments Should Work**:
1. Content marked with fragment indicators hidden initially
2. Pressing next shows next fragment
3. Multiple animation styles: fade-in, fade-out, grow, shrink, etc.
4. Can have fragment indices for custom order

**Proposed Implementation**:

**Step 1**: Parse fragment markers in markdown-parser.js
```javascript
// In parseMarkdown function
function extractFragments(content) {
  // Match patterns like:
  // - Item 1 <!-- .element: class="fragment" -->
  // - Item 2 <!-- .element: class="fragment fade-in" -->
  // - Item 3 <!-- .element: class="fragment" data-fragment-index="3" -->

  const fragmentRegex = /<!-- \.element: class="fragment([^"]*)" -->/g;
  // Parse and return fragment data
}
```

**Step 2**: Update slide data structure
```javascript
{
  id: 0,
  content: "...",
  fragments: [
    { index: 0, type: 'fade-in', content: '...' },
    { index: 1, type: 'fade-up', content: '...' }
  ],
  fragmentIndex: 0, // Current visible fragment
  totalFragments: 5
}
```

**Step 3**: Update navigation logic in Presentation.jsx
```javascript
const handleNext = () => {
  const currentSlide = slides[currentIndex];

  // If slide has fragments and not all shown
  if (currentSlide.fragments && currentSlide.fragmentIndex < currentSlide.totalFragments - 1) {
    // Show next fragment
    const updatedSlides = [...slides];
    updatedSlides[currentIndex].fragmentIndex++;
    setSlides(updatedSlides);
  } else {
    // Go to next slide
    goToNext();
  }
};
```

**Step 4**: Render fragments in Slide.jsx
```javascript
// Custom component for fragment rendering
function FragmentContent({ fragment, isVisible, animationType }) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      {fragment.content}
    </motion.div>
  );
}
```

**Step 5**: Support fragment syntax in markdown
```markdown
# Fragments Example

- First item (always visible)
- Second item <!-- .element: class="fragment" -->
- Third item <!-- .element: class="fragment fade-up" -->
- Fourth item <!-- .element: class="fragment" data-fragment-index="1" -->
```

**Alternative Syntax** (easier to parse):
```markdown
# Fragments Example

- First item (always visible)
- {.fragment} Second item
- {.fragment .fade-up} Third item
```

**Implementation Files**:
- `/app/src/lib/markdown-parser.js` - Parse fragments
- `/app/src/components/Presentation.jsx` - Navigation logic
- `/app/src/components/Slide.jsx` - Render fragments
- `/app/src/components/Fragment.jsx` - New component

**Time**: 4-6 hours
**Priority**: Critical (most important missing feature)

**Fragment Animation Types to Support**:
- fade-in (default)
- fade-up, fade-down, fade-left, fade-right
- fade-out
- fade-in-then-out
- grow, shrink
- strike
- highlight-red, highlight-blue, highlight-green

---

### Issue 8: Custom HTML Attributes Not Applying (Slide 41/52)

**Screenshot Evidence**: No purple background despite `data-background="#667eea"` comment

**Root Cause**: Slide attributes parsed but not applied
- Type: Missing Feature Implementation
- Severity: Medium
- Impact: Custom slide styling unavailable

**Current State**:
- markdown-parser.js may extract slide attributes
- Attributes not passed to Slide component
- No CSS/styling applied based on attributes

**Proposed Implementation**:

**Step 1**: Parse slide attributes in markdown-parser.js
```javascript
function parseSlideAttributes(content) {
  // Match: <!-- .slide: data-background="#667eea" -->
  // Match: <!-- .slide: data-background-color="red" -->
  // Match: <!-- .slide: data-transition="zoom" -->

  const attrRegex = /<!-- \.slide:\s*([^>]+) -->/;
  const match = content.match(attrRegex);

  if (!match) return {};

  const attributes = {};
  const attrString = match[1];

  // Parse data-background
  const bgMatch = attrString.match(/data-background="([^"]+)"/);
  if (bgMatch) attributes.background = bgMatch[1];

  // Parse data-background-color
  const bgColorMatch = attrString.match(/data-background-color="([^"]+)"/);
  if (bgColorMatch) attributes.backgroundColor = bgColorMatch[1];

  // Parse data-transition
  const transitionMatch = attrString.match(/data-transition="([^"]+)"/);
  if (transitionMatch) attributes.transition = transitionMatch[1];

  return attributes;
}

// In parseMarkdown
slides.forEach(slide => {
  slide.attributes = parseSlideAttributes(slide.content);
});
```

**Step 2**: Update Slide.jsx to apply attributes
```javascript
function Slide({ content, isActive, direction, attributes = {} }) {
  const bgStyle = {};

  // Apply background color
  if (attributes.backgroundColor) {
    bgStyle.backgroundColor = attributes.backgroundColor;
  }

  // Apply background image
  if (attributes.background) {
    if (attributes.background.startsWith('#')) {
      bgStyle.backgroundColor = attributes.background;
    } else if (attributes.background.startsWith('http')) {
      bgStyle.backgroundImage = `url(${attributes.background})`;
      bgStyle.backgroundSize = 'cover';
      bgStyle.backgroundPosition = 'center';
    }
  }

  return (
    <motion.div
      variants={slideVariants}
      className="absolute inset-0 overflow-auto"
      style={bgStyle}
    >
      {/* content */}
    </motion.div>
  );
}
```

**Step 3**: Pass attributes from Presentation.jsx
```javascript
<AnimatePresence mode="wait" custom={direction}>
  <Slide
    key={slides[currentIndex].id}
    content={slides[currentIndex].content}
    isActive={true}
    direction={direction}
    attributes={slides[currentIndex].attributes}
  />
</AnimatePresence>
```

**Supported Attributes**:
- `data-background` - Color hex or image URL
- `data-background-color` - Color hex
- `data-background-image` - Image URL
- `data-background-size` - CSS background-size
- `data-background-position` - CSS background-position
- `data-background-opacity` - 0-1 opacity
- `data-transition` - Transition style (future)

**Implementation Files**:
- `/app/src/lib/markdown-parser.js` - Parse attributes
- `/app/src/components/Slide.jsx` - Apply attributes
- `/app/src/components/Presentation.jsx` - Pass attributes

**Time**: 2-3 hours
**Priority**: High

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Week 1, Days 1-3)

**Day 1: Fragment System (6 hours)**
1. Parse fragment markers in markdown-parser.js (1.5 hours)
2. Update slide data structure for fragments (1 hour)
3. Implement fragment navigation logic (2 hours)
4. Create Fragment component with animations (1.5 hours)
5. Test with comprehensive example (30 min)

**Day 2: Custom Backgrounds (3 hours)**
1. Parse slide attributes (1 hour)
2. Apply background styles in Slide component (1 hour)
3. Test various background types (1 hour)

**Day 3: Math Rendering (2 hours)**
1. Install KaTeX dependencies (15 min)
2. Add remark-math and rehype-katex plugins (30 min)
3. Import KaTeX CSS (15 min)
4. Test math expressions (1 hour)

### Phase 2: Minor Fixes (Week 1, Days 4-5)

**Day 4: Visual Fixes (1 hour)**
1. Fix horizontal rule styling (15 min)
2. Fix image URLs in test content (15 min)
3. Test all visual elements (30 min)

**Day 5: Definition Lists (1 hour)**
1. Install remark-deflist (5 min)
2. Add to plugin chain (10 min)
3. Test definition lists (15 min)
4. Update documentation (30 min)

### Phase 3: Documentation (Week 2)

**Update Documentation**:
1. Update FEATURE_COMPARISON.md with completed features
2. Update TESTING.md with new test cases
3. Create FRAGMENTS.md guide for users
4. Update comprehensive-example.md with working examples

---

## Testing Plan

### Test Each Fix

**Fragment Animations**:
- [ ] Basic fragment fade-in works
- [ ] Fragment fade-up/down/left/right works
- [ ] Multiple fragments on one slide
- [ ] Fragment indices work correctly
- [ ] Navigation respects fragments
- [ ] Keyboard shortcuts work with fragments

**Custom Backgrounds**:
- [ ] Solid color backgrounds work
- [ ] Image backgrounds work
- [ ] Background opacity works
- [ ] Background size/position work
- [ ] Gradients work
- [ ] Multiple slides with different backgrounds

**Math Rendering**:
- [ ] Inline math renders correctly
- [ ] Block math ($$) renders correctly
- [ ] Complex equations work
- [ ] Greek letters display
- [ ] Integrals, sums, fractions work
- [ ] No console errors

**Visual Elements**:
- [ ] Horizontal rules visible
- [ ] Images display correctly
- [ ] All markdown elements styled
- [ ] Definition lists work
- [ ] No visual regressions

### Regression Testing

After each fix:
1. Run parser unit tests: `npm test`
2. Load comprehensive test: `?test=comprehensive`
3. Navigate through all 70+ slides
4. Check console for errors
5. Verify no visual regressions

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Success Criteria

**All Issues Resolved When**:
1. ✅ Images display correctly
2. ✅ Horizontal rules visible
3. ✅ Math expressions render (not raw LaTeX)
4. ✅ Definition lists render properly
5. ✅ Fragments work (incremental reveal)
6. ✅ Custom backgrounds apply correctly
7. ✅ No console errors
8. ✅ All 70+ test slides work
9. ✅ Parser tests still pass (13/13)
10. ✅ Documentation updated

**Performance Targets**:
- Initial load: < 1s
- Fragment animation: < 300ms
- Slide transition: < 500ms
- No memory leaks
- 60fps animations

---

## Risk Assessment

### Low Risk
- Horizontal rule styling (pure CSS)
- Image URL fixes (test content only)
- Definition lists (isolated plugin)

### Medium Risk
- Math rendering (new dependency, CSS conflicts)
- Custom backgrounds (styling complexity)

### High Risk
- Fragment system (touches multiple components, complex logic)
  - Mitigation: Implement incrementally, test each step
  - Rollback plan: Feature flag to disable fragments

---

## Dependencies Required

```bash
# Math rendering
npm install remark-math rehype-katex katex

# Definition lists (optional)
npm install remark-deflist

# Abbreviations (optional, low priority)
npm install remark-abbr
```

**Total bundle size impact**: ~100KB (mostly KaTeX)

---

## Rollback Plan

If any fix breaks existing functionality:

1. **Fragments**: Add feature flag `ENABLE_FRAGMENTS` in config
2. **Math**: Wrap in try-catch, fallback to plain text
3. **Backgrounds**: Apply styles conditionally, default to gradient
4. **Plugins**: Remove from plugin chain, document as unsupported

---

## Next Steps

1. **Review this plan** with team/stakeholders
2. **Prioritize fixes** if timeline needs adjustment
3. **Create feature branches** for each major fix:
   - `feature/fragment-animations`
   - `feature/custom-backgrounds`
   - `feature/math-rendering`
4. **Implement in order** of priority
5. **Test thoroughly** after each fix
6. **Update documentation** as features complete
7. **Create PR** when all fixes complete

---

## Questions to Answer

Before implementation:

1. **Math Rendering**: KaTeX or MathJax?
   - Recommendation: KaTeX (faster, smaller)

2. **Fragment Syntax**: HTML comments or custom markers?
   - Recommendation: HTML comments (reveal.js compatible)

3. **Definition Lists**: Include or document as unsupported?
   - Recommendation: Include (small dependency)

4. **Abbreviations**: Include or skip?
   - Recommendation: Skip (rarely used, can add later)

5. **Timeline**: All fixes in 1 week or spread over 2?
   - Recommendation: 1 week intensive or 2 weeks alongside other work

---

## Contact & Support

**Primary Developer**: Andrew Dubinsky & Claude Sonnet 4.5
**Project**: Slidedown v2
**Branch**: `v2-custom-renderer`
**Last Updated**: 2026-01-27

---

**Status**: ✅ Plan Complete - Ready for Implementation
