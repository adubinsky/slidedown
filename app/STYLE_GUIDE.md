# Slidedown v2 Style Guide

**Version**: 2.0
**Last Updated**: 2026-01-27

This document defines the visual design system for all Slidedown presentations. All markdown content is automatically styled according to these guidelines to ensure consistent, professional appearance.

---

## Typography Hierarchy

### Headings

All headings use system fonts with optimized spacing and weights:

| Element | Size | Weight | Use Case | Style |
|---------|------|--------|----------|-------|
| `# H1` | 6xl (64px) | Extrabold | Slide titles | Gradient (blue→purple) |
| `## H2` | 5xl (48px) | Bold | Section headings | White |
| `### H3` | 4xl (36px) | Semibold | Sub-sections | Gray-100 |
| `#### H4` | 3xl (30px) | Semibold | Sub-sub-sections | Gray-100 |
| `##### H5` | 2xl (24px) | Semibold | Minor headings | Gray-200 |
| `###### H6` | xl (20px) | Semibold | Smallest headings | Gray-200 |

### Body Text

- **Paragraph**: 3xl (24px), leading-relaxed, gray-100
- **Lists**: 3xl (24px), leading-relaxed, custom bullets
- **Blockquotes**: 3xl (24px), italic, gray-300, bordered

### Code

- **Inline code**: xl (20px), monospace, blue background
- **Code blocks**: xl (20px), monospace, dark background with syntax highlighting

---

## Color Palette

### Text Colors

```css
Primary:   #ffffff (white)
Secondary: #e5e7eb (gray-100)
Muted:     #9ca3af (gray-400)
Accent:    #60a5fa (blue-400)
Emphasis:  #a78bfa (purple-400)
```

### Background Colors

```css
Primary:    #111827 (gray-900)
Secondary:  #1f2937 (gray-800)
Code:       #1e293b (slate-800)
Accent:     #3b82f6 (blue-500)
```

### Semantic Colors

```css
Success:    #22c55e (green-500)
Warning:    #eab308 (yellow-500)
Error:      #ef4444 (red-500)
Info:       #3b82f6 (blue-500)
```

---

## Spacing System

Consistent spacing creates visual rhythm:

```css
xs:  0.5rem  (8px)   - Tight spacing
sm:  1rem    (16px)  - Default small gap
md:  1.5rem  (24px)  - Medium gap
lg:  2rem    (32px)  - Large gap
xl:  3rem    (48px)  - Extra large gap
2xl: 4rem    (64px)  - Huge gap
3xl: 6rem    (96px)  - Massive gap
```

### Applied Spacing

- **Between paragraphs**: 1.5rem (mb-6)
- **After headings**: 1-2rem (mb-4 to mb-8)
- **Around lists**: 1.5rem (mb-6)
- **Around code blocks**: 1.5rem (mb-6)
- **Around images**: 1.5rem (my-6)

---

## Markdown Element Styles

### Lists

**Unordered Lists**
- Custom arrow bullets (→)
- Blue accent color for bullets
- Generous line spacing

```markdown
- First item
- Second item
- Third item
```

**Ordered Lists**
- Custom numbered bullets (1. 2. 3.)
- Blue accent color for numbers
- Automatic counter increment

```markdown
1. First item
2. Second item
3. Third item
```

### Code Blocks

**Style**: Dark theme with syntax highlighting

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

**Features**:
- Rounded corners (rounded-xl)
- Border (gray-700)
- Shadow effect
- Horizontal scrolling for long lines
- Monokai color scheme

### Blockquotes

**Style**: Left-bordered with background

```markdown
> This is a blockquote with styled appearance
```

**Features**:
- Blue left border (4px)
- Semi-transparent gray background
- Italic text
- Padding on all sides

### Tables

**Style**: Modern with hover effects

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |

**Features**:
- Rounded container
- Gray header background
- Row hover effects
- Proper cell padding
- Border bottom on rows

### Links

**Style**: Blue with underline, hover effects

```markdown
[Link text](https://example.com)
```

**Features**:
- Blue color (#60a5fa)
- Underline decoration
- Lighter on hover
- Smooth transition

### Images

**Style**: Centered, responsive, with shadow

```markdown
![Alt text](image.png)
```

**Features**:
- Max 100% width
- Auto height
- Centered horizontally
- Rounded corners
- Drop shadow

### Horizontal Rules

**Style**: Subtle divider

```markdown
---
```

**Features**:
- 2px gray border
- Vertical margin (my-8)

---

## Layout Modes

### Center Layout (Default)

Content centered horizontally and vertically:

```css
.slide-layout-center
```

**Use for**:
- Title slides
- Single concepts
- Big quotes
- Centered images

### Left-Aligned Layout

Content aligned to left with max-width:

```css
.slide-layout-left
```

**Use for**:
- Text-heavy slides
- Lists
- Multiple paragraphs
- Reading flow

### Two-Column Layout

Grid with two equal columns:

```css
.slide-layout-two-column
```

**Use for**:
- Compare/contrast
- Before/after
- Code + explanation
- Image + text

### Image Focus Layout

Minimal chrome, image takes center stage:

```css
.slide-layout-image
```

**Use for**:
- Full-screen images
- Diagrams
- Screenshots
- Visual content

---

## Animations

### Built-in Animations

**Fade In**
```css
.animate-fade-in
```
Smooth opacity transition with subtle upward movement.

**Slide Up**
```css
.animate-slide-up
```
Content slides in from bottom with opacity fade.

**Scale In**
```css
.animate-scale-in
```
Content scales from 90% to 100% with opacity fade.

**Pulse (Slow)**
```css
.animate-pulse-slow
```
Gentle pulsing effect, good for emphasis.

### Slide Transitions

- **Direction**: Vertical (up/down)
- **Duration**: 300-500ms
- **Easing**: Spring animation (stiffness: 200, damping: 25)
- **Effects**: Y-axis movement, opacity fade, scale transform

---

## Special Components

### Highlight Box

```html
<div class="highlight-box">
  Important information here
</div>
```

**Features**: Blue accent, semi-transparent background, left border

### Warning Box

```html
<div class="warning-box">
  Warning message here
</div>
```

**Features**: Yellow accent, semi-transparent background, left border

### Success Box

```html
<div class="success-box">
  Success message here
</div>
```

**Features**: Green accent, semi-transparent background, left border

### Error Box

```html
<div class="error-box">
  Error message here
</div>
```

**Features**: Red accent, semi-transparent background, left border

### Glass Effect

```html
<div class="glass">
  Glassmorphism content
</div>
```

**Features**: Frosted glass effect with backdrop blur

### Text Gradient

```html
<span class="text-gradient">
  Gradient text
</span>
```

**Features**: Blue → Purple → Pink gradient

---

## Accessibility

### Font Rendering
- Antialiasing enabled for smooth text
- High contrast ratios (WCAG AA compliant)
- Readable font sizes (minimum 20px)

### Keyboard Navigation
- Full keyboard support
- Clear focus indicators
- Logical tab order

### Color Contrast
- Text on dark background: Minimum 7:1 ratio
- Links clearly distinguishable
- Sufficient color differentiation

### Screen Readers
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed

---

## Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Font Scaling

All text uses responsive sizes with `md:` prefix:
- `text-6xl md:text-7xl` - Scales up on larger screens
- `text-2xl md:text-3xl` - Consistent scaling

### Layout Adjustments

- **Padding**: Reduced on mobile
- **Columns**: Single column on mobile, grid on desktop
- **Images**: Full width on mobile, constrained on desktop

---

## Best Practices

### Do's ✅

- Use semantic HTML elements
- Keep slides simple (one main idea per slide)
- Use consistent spacing
- Leverage the built-in typography scale
- Use animations sparingly for emphasis
- Test on different screen sizes
- Use high contrast colors

### Don'ts ❌

- Don't override base styles unnecessarily
- Don't use too many fonts
- Don't overcrowd slides with content
- Don't use tiny font sizes
- Don't ignore spacing guidelines
- Don't use low-contrast color combinations
- Don't animate everything

---

## Example Slide Structures

### Title Slide

```markdown
# Main Title

Subtitle or tagline here

---
```

### Content Slide

```markdown
## Section Title

- Key point one
- Key point two
- Key point three

---
```

### Code Example Slide

```markdown
## Feature Name

\`\`\`javascript
const example = 'code here';
\`\`\`

Brief explanation of the code

---
```

### Image + Caption Slide

```markdown
![Description](image.png)

*Caption text explaining the image*

---
```

### Quote Slide

```markdown
> "Inspiring quote goes here"

— Author Name

---
```

### Comparison Slide

```markdown
## Before vs After

### Before
- Old way
- Inefficient
- Complex

### After
- New way
- Efficient
- Simple

---
```

---

## Technical Implementation

### CSS Architecture

```
src/
├── index.css           # Main styles with @layer directives
└── styles/
    └── slideStyles.js  # JavaScript style definitions
```

### Tailwind Integration

All styles use Tailwind's `@apply` directive for consistency:

```css
.slide-content h1 {
  @apply text-6xl font-extrabold mb-8;
  @apply text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500;
}
```

### Custom Properties

For advanced customization, these CSS custom properties are available:

```css
--slide-bg-primary: #111827;
--slide-bg-secondary: #1f2937;
--slide-text-primary: #ffffff;
--slide-text-secondary: #e5e7eb;
--slide-accent: #3b82f6;
```

---

## Customization Guide

### Creating Custom Themes

1. Copy the style guide values
2. Modify colors and spacing
3. Update Tailwind config
4. Test on sample slides
5. Export as theme JSON

### Per-Slide Customization

Use HTML comments to customize individual slides:

```markdown
<!-- .slide: data-layout="center" data-background="#1e293b" -->
# Custom Slide

Content here
```

### Custom CSS

Add custom styles in a separate CSS file:

```css
.my-custom-style {
  /* Your styles */
}
```

---

## Version History

- **v2.0** (2026-01-27): Initial style guide with comprehensive system
- Future versions will add more themes and customization options

---

## Support & Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion API](https://www.framer.com/motion/)
- [React Markdown](https://remarkjs.github.io/react-markdown/)
- [Slidedown GitHub](https://github.com/adubinsky/slidedown)

---

**Maintained by**: Andrew Dubinsky & Claude
**License**: MIT
