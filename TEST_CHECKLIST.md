# Slidedown v2 - Test Checklist

**Date**: 2026-01-27
**Version**: 2.0-beta
**Purpose**: Verify all newly implemented features

---

## Quick Start

1. Make sure dev server is running:
   ```bash
   cd app && npm run dev
   ```

2. Open comprehensive test:
   ```
   http://localhost:5173?test=comprehensive
   ```

3. Work through this checklist

---

## Feature Tests

### ✅ Math Rendering (Slide 23/52)

**What to test**:
- Inline math expression: E = mc²
- Block math: Quadratic formula
- Greek letters, integrals, fractions

**Expected**:
- ✅ Rendered as formatted mathematical equations
- ✅ NOT showing raw LaTeX ($E = mc^2$, etc.)
- ✅ Proper font rendering
- ✅ Correct spacing and sizing

**How to verify**:
- Navigate to slide 23
- Should see beautifully formatted math equations
- No dollar signs or backslashes visible

---

### ✅ Horizontal Rules (Slide 17/52)

**What to test**:
- Horizontal divider line between sections

**Expected**:
- ✅ Visible gray gradient line
- ✅ Fades from transparent to gray to transparent
- ✅ Proper spacing above and below

**How to verify**:
- Navigate to slide 17
- Should see a clear horizontal line
- Line should be obvious, not subtle or invisible

---

### ✅ Definition Lists (Slide 24/52)

**What to test**:
- Term 1 / Term 2 (bold, large)
- Definitions (indented, blue left border)

**Expected**:
- ✅ Terms in bold white text
- ✅ Definitions indented with blue left border
- ✅ Proper spacing between items
- ✅ NOT showing raw markdown (`: Definition...`)

**How to verify**:
- Navigate to slide 24
- Should see formatted definition list
- No colons at start of definition lines

---

### ✅ Custom Backgrounds (Slide 41/52)

**What to test**:
- Slide with purple background

**Expected**:
- ✅ Entire slide has purple (#667eea) background
- ✅ Text still readable on purple background
- ✅ NOT the default gray gradient

**How to verify**:
- Navigate to slide 41
- Whole slide should be purple
- Title should say "Colored Background"

---

### ✅ Fragment Animations (Slides 42-43/52)

**Slide 42: Fragments Test**

**What to test**:
- Press next to reveal items one by one
- Press previous to hide items in reverse

**Expected**:
- ✅ Only "Content that appears incrementally:" visible initially
- ✅ Pressing next shows "First point"
- ✅ Pressing next again shows "Second point"
- ✅ Pressing next again shows "Third point"
- ✅ Pressing previous hides them in reverse order
- ✅ NOT all items visible at once
- ✅ NOT showing HTML comments (<!-- .element... -->)

**Slide 43: Fragment Animations**

**What to test**:
- Different animation types
- Items appear with different effects

**Expected**:
- ✅ Fade in: Simple fade
- ✅ Fade out: Disappears
- ✅ Fade up: Slides up while fading
- ✅ Grow: Scales up from small
- ✅ Shrink: Scales down from large
- ✅ Smooth transitions (not instant)

**How to verify**:
- Navigate to slide 42
- Press down arrow or space to advance
- Watch items appear one at a time
- Try going backward (up arrow)

---

### ✅ Images (Slide 8/52)

**What to test**:
- Placeholder image displays
- Caption below image

**Expected**:
- ✅ Blue placeholder image visible
- ✅ Text saying "Slidedown v2" on image
- ✅ Caption below image

**How to verify**:
- Navigate to slide 8
- Should see actual image, not broken link icon

---

## Parser Tests

### Run Automated Tests

**In browser console**:
```javascript
// Auto-runs with this URL:
http://localhost:5173?test=true

// Or open console and type:
import { runTests } from './src/lib/markdown-parser.test.js';
runTests();
```

**Expected Output**:
```
Running Markdown Parser Tests...

✅ Parse simple markdown into slides
✅ Parse vertical slides correctly
✅ Extract slide titles from headings
✅ Generate table of contents
✅ Get next slide
✅ Get previous slide
✅ Get next slide returns null at end
✅ Get previous slide returns null at start
✅ Extract speaker notes
✅ Handle empty slides
✅ Handle complex markdown elements
✅ Generate unique slide IDs
✅ Slide IDs are sequential
✅ Handle null/undefined input gracefully
✅ Parse slide attributes
✅ Parse fragments
✅ Fragments start hidden
✅ Multiple slide attributes

==================================================
Test Results: 17 passed, 0 failed
==================================================
```

**If tests fail**:
- Note which test failed
- Check console for error details
- Report issue

---

## Navigation Tests

### Fragment Navigation

**Test 1: Fragment Advance**
- Navigate to slide 42
- Press Space/Down arrow
- Verify fragments appear one at a time
- Verify navigation waits until all fragments shown
- Then advances to next slide

**Test 2: Fragment Reverse**
- Navigate to slide 43 with all fragments visible
- Press Up arrow
- Verify fragments disappear in reverse order
- Verify navigation doesn't go to previous slide until all fragments hidden

**Test 3: Jump to Slide with Fragments**
- Use TOC to jump to slide 42
- Verify all fragments start hidden
- Navigate forward to reveal them

---

## Browser Compatibility

### Chrome (Primary)
- [ ] Math renders correctly
- [ ] Fragments animate smoothly
- [ ] Custom backgrounds apply
- [ ] Definition lists formatted
- [ ] No console errors

### Firefox
- [ ] Math renders correctly
- [ ] Fragments work
- [ ] Backgrounds work
- [ ] Overall appearance matches Chrome

### Safari
- [ ] KaTeX fonts load
- [ ] Math renders correctly
- [ ] Fragments work
- [ ] Animations smooth

---

## Performance Tests

### Load Time
- [ ] Page loads in < 1 second
- [ ] Math renders without long delay
- [ ] Smooth transition to first slide

### Animation Performance
- [ ] Fragment animations at 60fps
- [ ] No stuttering when revealing fragments
- [ ] Slide transitions smooth
- [ ] No lag when navigating

### Memory Usage
- [ ] Navigate through all 70+ slides
- [ ] Reveal all fragments
- [ ] Memory usage stays reasonable (< 100MB)
- [ ] No obvious memory leaks

---

## Regression Tests

### Previously Working Features

**Existing Features (Must Still Work)**:
- [ ] Basic navigation (arrows, space, home, end)
- [ ] TOC opens/closes with 'T'
- [ ] TOC navigation works
- [ ] Current slide highlighted in TOC
- [ ] Vertical slides show in TOC
- [ ] Progress bar updates
- [ ] Slide counter accurate
- [ ] Code syntax highlighting
- [ ] Tables styled correctly
- [ ] Lists have custom bullets
- [ ] H1 gradient effect
- [ ] Blockquotes styled
- [ ] Links clickable

---

## Edge Cases

### Fragment Edge Cases
- [ ] Slide with 0 fragments navigates normally
- [ ] Slide with 10+ fragments works correctly
- [ ] Fragments with custom indices work
- [ ] Mixed fragment types on one slide

### Background Edge Cases
- [ ] Slide with color background
- [ ] Slide with image background
- [ ] Slide with no background (default)
- [ ] Multiple background attributes
- [ ] Background opacity < 1

### Math Edge Cases
- [ ] Empty math expressions
- [ ] Complex nested equations
- [ ] Multiple math blocks on one slide
- [ ] Math inside lists/quotes

---

## Known Issues (Expected)

These are known limitations, not bugs:

1. **Abbreviations**: Not supported (deferred)
2. **Fragment markers**: HTML comments may be briefly visible
3. **Auto-animate**: Parsed but not animated
4. **Transition types**: Only vertical slide transition works

---

## Report Issues

If you find a bug:

1. Note the slide number
2. Describe what you expected
3. Describe what actually happened
4. Check browser console for errors
5. Take screenshot if visual bug
6. Note your browser and OS

---

## Success Criteria

### All Tests Pass When:

**Math Rendering**: ✅
- No raw LaTeX visible
- Equations formatted correctly
- Fonts render properly

**Fragments**: ✅
- Incremental reveal works
- All animation types work
- Navigation respects fragments

**Backgrounds**: ✅
- Custom colors apply
- Images load and display
- Opacity works

**Definition Lists**: ✅
- Formatted correctly
- No raw markdown visible
- Styled properly

**Performance**: ✅
- Load time < 1s
- 60fps animations
- No memory leaks

**Regression**: ✅
- All existing features work
- No broken functionality
- No visual regressions

---

## Quick Visual Check

Navigate through these key slides:

1. Slide 8: Images ✅
2. Slide 17: Horizontal rules ✅
3. Slide 23: Math rendering ✅
4. Slide 24: Definition lists ✅
5. Slide 41: Custom background ✅
6. Slide 42-43: Fragments ✅

If all 6 look correct, most features are working!

---

**Last Updated**: 2026-01-27
**Tester**: __________
**Status**: ⬜ Not Started / ⏳ In Progress / ✅ Complete
