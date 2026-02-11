# Slidedown 2.0

**Modern markdown presentations with a custom React renderer**

Slidedown helps you create beautiful presentations from markdown files with a completely custom rendering engine built on React, Framer Motion, and Tailwind CSS.

## What's New in 2.0?

Slidedown 2.0 is a complete rewrite from the ground up:

- **Custom React Renderer** - No more reveal.js dependency, built with modern React 19
- **Framer Motion Animations** - Smooth, performant animations for fragments and transitions
- **Tailwind CSS** - Modern, customizable styling with utility classes
- **Advanced Fragment System** - 12+ animation types for incremental content reveal
- **Math Rendering** - Full LaTeX support via KaTeX
- **Interactive TOC** - Sidebar table of contents with live progress tracking
- **Vertical Slides** - Hierarchical slide organization
- **Custom Backgrounds** - Per-slide colors, images, and opacity control
- **Code Highlighting** - Syntax highlighting for 100+ languages
- **Definition Lists** - Semantic formatting for glossaries and terms

## Quick Start

### Development Mode

```bash
# Install dependencies
npm install
cd app && npm install

# Start the dev server
cd app && npm run dev
```

Open http://localhost:5173 to see your presentation.

### Load Custom Markdown

Place your markdown file in `app/src/test-content/` and load it with:

```
http://localhost:5173?test=your-file-name
```

Or use the comprehensive example:

```
http://localhost:5173?test=comprehensive
```

## Writing Slides

### Basic Slides

Separate horizontal slides with `---`:

```markdown
# Title Slide

Your opening content

---

## Second Slide

Use three dashes for horizontal slides
```

### Vertical Slides

Create nested slides with `--`:

```markdown
## Main Topic

Parent slide content

--

### Subtopic 1

Nested under main topic

--

### Subtopic 2

Another nested slide
```

### Fragment Animations

Reveal content incrementally with 12+ animation types:

```markdown
## My Slide

- Always visible
- Appears first <!-- .element: class="fragment" -->
- Fades up <!-- .element: class="fragment fade-up" -->
- Fades down <!-- .element: class="fragment fade-down" -->
- Fades left <!-- .element: class="fragment fade-left" -->
- Fades right <!-- .element: class="fragment fade-right" -->
- Grows <!-- .element: class="fragment grow" -->
- Shrinks <!-- .element: class="fragment shrink" -->
- Strike through <!-- .element: class="fragment strike" -->
- Highlight red <!-- .element: class="fragment highlight-red" -->
- Highlight green <!-- .element: class="fragment highlight-green" -->
- Highlight blue <!-- .element: class="fragment highlight-blue" -->
```

### Math Equations

Full LaTeX support with KaTeX:

```markdown
## Equations

Inline math: $E = mc^2$

Block equations:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

$$
\frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$
```

### Custom Backgrounds

Customize slide backgrounds with HTML comments:

```markdown
<!-- .slide: data-background="#667eea" -->

## Purple Slide

Solid color background

---

<!-- .slide: data-background-image="https://example.com/image.jpg" -->

## Image Background

Full-screen image

---

<!-- .slide: data-background-image="https://example.com/image.jpg" data-background-opacity="0.3" -->

## Subtle Background

Image with reduced opacity
```

### Code Blocks

Syntax highlighting for 100+ languages:

```markdown
## Code Example

\`\`\`javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`
```

### Definition Lists

Create glossaries and term definitions:

```markdown
## Glossary

React
: A JavaScript library for building user interfaces
: Developed by Meta (Facebook)

Vue
: The progressive JavaScript framework
: Known for its gentle learning curve

Svelte
: A radical new approach to building user interfaces
: Compiles to vanilla JavaScript
```

### Tables

GitHub-flavored markdown tables:

```markdown
## Feature Comparison

| Feature | Status | Notes |
|---------|--------|-------|
| Fragments | ✅ | 12+ animation types |
| Math | ✅ | Full LaTeX via KaTeX |
| TOC | ✅ | Interactive sidebar |
| Vertical Slides | ✅ | Hierarchical organization |
```

### Other Markdown Elements

All standard markdown is supported:

```markdown
## Rich Content

**Bold text** and *italic text*

> Blockquotes for emphasis

- Unordered lists
  - With nesting
  - Multiple levels

1. Ordered lists
2. Second item
3. Third item

[Links work great](https://github.com/adubinsky/slidedown)

Inline `code snippets` too
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide (or next fragment) |
| `←` | Previous slide (or previous fragment) |
| `↑` / `↓` | Navigate vertical slides |
| `T` | Toggle Table of Contents |
| `Home` | First slide |
| `End` | Last slide |
| `Esc` | Close TOC |

## Architecture

Slidedown 2.0 is built with modern web technologies:

### Core Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast dev server and build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-ready animation library

### Markdown Processing

- **react-markdown** - React component for markdown rendering
- **remark-gfm** - GitHub-flavored markdown support
- **remark-math** - LaTeX math syntax parsing
- **remark-deflist** - Definition list support
- **rehype-katex** - Math rendering with KaTeX
- **rehype-highlight** - Syntax highlighting
- **rehype-raw** - Raw HTML support

### Custom Features

- **Custom Fragment System** - Built with rehype plugin and Framer Motion
- **Slide Parser** - Extracts slide attributes and metadata
- **Navigation System** - Full keyboard and programmatic navigation
- **TOC Generator** - Auto-generates table of contents from headings

## Project Structure

```
slidedown/
├── app/                          # React application (2.0)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Presentation.jsx  # Main presentation container
│   │   │   ├── Slide.jsx         # Individual slide renderer
│   │   │   ├── Navigation.jsx    # Navigation controls
│   │   │   └── TOC.jsx           # Table of contents sidebar
│   │   ├── lib/
│   │   │   ├── markdown-parser.js       # Slide & attribute parsing
│   │   │   ├── markdown-parser.test.js  # Parser tests
│   │   │   └── rehype-fragments.js      # Fragment plugin
│   │   ├── styles/
│   │   │   └── slideStyles.js    # Dynamic slide styling
│   │   ├── test-content/         # Example presentations
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles & Tailwind
│   ├── package.json              # App dependencies
│   └── vite.config.js            # Vite configuration
├── ROADMAP.md                    # Product roadmap
└── README.md                     # This file
```

## Feature Parity

Slidedown 2.0 currently has **85% feature parity** with reveal.js:

### ✅ Implemented

- [x] Markdown slides with `---` and `--` separators
- [x] Fragment animations (12+ types)
- [x] Math rendering (LaTeX/KaTeX)
- [x] Custom slide backgrounds (colors, images, opacity)
- [x] Code syntax highlighting (100+ languages)
- [x] Vertical slides (nested organization)
- [x] Table of contents sidebar
- [x] Keyboard navigation
- [x] All markdown elements (lists, tables, blockquotes, etc.)
- [x] Definition lists
- [x] GitHub-flavored markdown (GFM)

### 🚧 Coming Soon (Tier 1 - Next 2 Weeks)

- [ ] Speaker notes view (separate presenter window)
- [ ] Overview mode (grid view of all slides)
- [ ] Responsive design (mobile-friendly)
- [ ] Fullscreen mode

### 📋 Planned (Tier 2 - Weeks 3-4)

- [ ] Integrated markdown editor (split-pane with live preview)
- [ ] File import/export
- [ ] Auto-save to localStorage

### 🎨 Future (Tier 3+)

- [ ] Simple theme system (editable CSS files)
- [ ] More transition types (fade, zoom, etc.)
- [ ] Auto-animate between slides
- [ ] PDF export
- [ ] Code line highlighting

See [ROADMAP.md](ROADMAP.md) for detailed planning.

## Development

### Running Tests

The markdown parser has built-in tests. Run them by visiting:

```
http://localhost:5173?test=true
```

You should see: `Test Results: 17 passed, 0 failed`

### Testing Features

Load the comprehensive example to test all features:

```
http://localhost:5173?test=comprehensive
```

This includes examples of:
- All fragment animation types
- Math equations (inline and block)
- Custom backgrounds
- Definition lists
- Code highlighting
- Tables, lists, blockquotes
- Vertical slides

### Building for Production

```bash
cd app
npm run build
```

Output will be in `app/dist/`.

## Performance

- **Bundle Size**: ~500KB (including KaTeX fonts)
- **Load Time**: ~350ms on broadband
- **Animations**: 60fps with Framer Motion
- **Memory**: <50MB typical usage

## Browser Support

Tested and working in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Migration from 1.0

Slidedown 2.0 is a complete rewrite and not backwards compatible with 1.0. Key differences:

### What Changed

- **No reveal.js** - Custom renderer instead of reveal.js
- **React-based** - Full React component architecture
- **Vite instead of Gulp** - Modern build tooling
- **Tailwind CSS** - Utility-first styling system
- **New fragment syntax** - HTML comments instead of reveal.js classes

### Markdown Compatibility

Most markdown remains the same:
- ✅ Slide separators (`---` and `--`) work identically
- ✅ All standard markdown is compatible
- ✅ Code blocks work the same
- ⚠️ Fragment syntax uses HTML comments now
- ⚠️ Slide attributes use HTML comments (same as reveal.js markdown)

## Contributing

Slidedown 2.0 is in active development. See [ROADMAP.md](ROADMAP.md) for planned features and priorities.

## Credits

**Andrew Dubinsky** ([@andrewdubinsky](https://twitter.com/andrewdubinsky)) - Creator & Maintainer

## License

Slidedown is available under **dual licensing**:

### Free License (Non-Commercial)

**Prosperity Public License 3.0.0** - Free for non-commercial use

✅ **Free for:**
- Personal projects and presentations
- Non-profit organizations
- Educational institutions
- Research and academic use
- Open source projects
- Hobbyists and students

✅ **Includes:**
- Full source code access
- Right to modify and share
- 30-day commercial trial period

See [LICENSE](LICENSE) for complete terms.

### Commercial License

**Commercial use requires a paid license** after the 30-day trial period.

💼 **Required for:**
- Business presentations and internal use
- SaaS or hosted services
- Commercial products or services
- For-profit companies
- Client work and consulting

📋 **License Options:**
- **Individual Developer**: $199/year
- **Team (up to 10 devs)**: $799/year
- **Enterprise (unlimited)**: $2,999/year + white-label rights
- **SaaS/Hosting**: Custom pricing

See [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md) for details and pricing.

### Purchase a Commercial License

📧 **Contact**: andrew@cloudze.com
🐙 **GitHub**: https://github.com/adubinsky/slidedown

---

**Copyright (c) 2026 Andrew Dubinsky**

---

**Slidedown 2.0** - Markdown presentations reimagined with modern web technology.
