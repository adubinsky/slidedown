# Slidedown 2.0

**Modern markdown presentations with a custom React renderer**

Slidedown helps you create beautiful presentations from markdown files with a completely custom rendering engine built on React, Framer Motion, and Tailwind CSS.

## What's New in 2.0?

Slidedown 2.0 is a complete rewrite from the ground up:

- **Custom React Renderer** - No more reveal.js dependency, built with modern React 19
- **Framer Motion Animations** - Smooth, performant animations for fragments and transitions
- **Tailwind CSS** - Modern, customizable styling with utility classes
- **Markdown-Native Syntax** - New symbol-based syntax for fragments and slide directives (no HTML!)
- **Advanced Fragment System** - 12+ animation types for incremental content reveal
- **Math Rendering** - Full LaTeX support via KaTeX
- **Interactive TOC** - Sidebar table of contents with live progress tracking
- **Vertical Slides** - Hierarchical slide organization
- **Custom Backgrounds** - Per-slide colors, images, gradients, and opacity control
- **Code Highlighting** - Syntax highlighting for 100+ languages
- **Definition Lists** - Semantic formatting for glossaries and terms
- **Mouse Wheel Navigation** - Scroll through slides naturally
- **MCP Server** - Claude integration for AI-assisted presentation creation
- **CLI Tool** - Command-line interface with init, serve, build commands

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/adubinsky/slidedown.git
cd slidedown

# Install dependencies
npm install
cd app && npm install && cd ..

# Link the CLI globally
npm link
```

Now `slidedown` works from any directory!

### Create Your First Presentation

```bash
# Create a new folder for your presentation
mkdir ~/my-presentation
cd ~/my-presentation

# Initialize a new presentation
slidedown init

# Start the dev server
slidedown serve
```

Open http://localhost:5173 to see your presentation.

### Edit and Preview

Edit `presentation.md` in your current directory. The dev server will automatically:
- Detect your changes
- Reload the browser
- Show your updates instantly

### Try the Examples

Built-in examples are available with the `?test=` parameter:

```
http://localhost:5173?test=new-syntax-demo
```
Showcases the new markdown-native syntax with `:::` directives and symbol-based fragments

```
http://localhost:5173?test=comprehensive
```
Comprehensive example with all features (uses old HTML comment syntax)

### Claude/MCP Integration

Slidedown includes an MCP server for Claude integration. Once installed, you can ask Claude to:
- Create presentations from scratch
- Edit existing presentations
- Add slides, animations, and styling
- Generate content with proper Slidedown syntax

**Install MCP server:** See [MCP-INSTALLATION.md](MCP-INSTALLATION.md) for complete instructions.

**Usage example:**
```
You: "Create a 5-slide presentation about quantum computing"

Claude: [Uses MCP tools to generate the presentation]
```

**Compatible with:** Claude Desktop, Claude Code CLI, and any MCP-compatible AI system.

**Learn more:** [MCP-CLI-GUIDE.md](MCP-CLI-GUIDE.md)

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

## New Markdown-Native Syntax

Slidedown 2.0 introduces clean, markdown-native syntax for fragments and slide styling - **no HTML comments required!**

### Slide Directives with `:::`

Use `:::` at the start of a line to set slide properties:

```markdown
::: #667eea

## Purple Background

This slide has a purple background - no HTML needed!

---

::: https://images.unsplash.com/photo-1506905925346-21bda4d32df4
::: opacity:0.3

## Image Background

Background image at 30% opacity for readability

---

::: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

## Gradient Background

Beautiful gradient backgrounds too!
```

**Supported `:::` directives:**
- **Colors**: `#667eea`, `rgb(100, 126, 234)`, `hsl(230, 75%, 65%)`
- **Images**: Any URL starting with `http://`, `https://`, or `/`
- **Gradients**: `linear-gradient(...)`, `radial-gradient(...)`
- **Opacity**: `opacity:0.3` (0.0 to 1.0, for image backgrounds)

### Symbol-Based Fragment Animations

Use intuitive symbols instead of HTML comments:

```markdown
## My Slide

- ^^^ This fades up from bottom
- vvv This fades down from top
- ---> This slides in from right
- <--- This slides in from left
- +++ This grows larger
- ... This shrinks smaller
- ~~~ This strikes through
- >>red This highlights in red
- >>green This highlights in green
- >>blue This highlights in blue
- >> This just fades in (basic)
```

**Symbol meanings:**
- `^^^` = arrows pointing up = "fade up"
- `vvv` = arrows pointing down = "fade down"
- `--->` = arrow pointing right = "slide right"
- `<---` = arrow pointing left = "slide left"
- `+++` = plus signs = "grow bigger"
- `...` = ellipsis = "shrink smaller"
- `~~~` = tilde = "strike through"
- `>>` = chevron = "reveal/highlight"

### Inline Fragments

Wrap text with matching symbols for inline animations:

```markdown
## Inline Effects

This sentence has +++some words that grow+++ when revealed.

You can also ^^^fade up text^^^ or ~~~strike through~~~ specific phrases.

Perfect for +++emphasizing+++ key concepts!
```

**Inline patterns:**
- `+++text+++` = grows
- `^^^text^^^` = fades up
- `vvv text vvv` = fades down
- `...text...` = shrinks
- `~~~text~~~` = strikes through

### Backward Compatibility

The old HTML comment syntax still works for compatibility:

```markdown
- Item <!-- .element: class="fragment fade-up" -->
<!-- .slide: data-background="#667eea" -->
```

But the new syntax is **cleaner and more readable**!

### Fragment Animations (Old Syntax)

Reveal content incrementally with 12+ animation types.

**New syntax (recommended):**

```markdown
## My Slide

- Always visible
- >> Appears first (basic fade in)
- ^^^ Fades up from bottom
- vvv Fades down from top
- <--- Slides in from left
- ---> Slides in from right
- +++ Grows larger
- ... Shrinks smaller
- ~~~ Strikes through
- >>red Highlights in red
- >>green Highlights in green
- >>blue Highlights in blue
```

**Old syntax (still supported):**

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

Customize slide backgrounds with the new `:::` syntax or HTML comments.

**New syntax (recommended):**

```markdown
::: #667eea

## Purple Slide

Solid color background

---

::: https://example.com/image.jpg

## Image Background

Full-screen image

---

::: https://example.com/image.jpg
::: opacity:0.3

## Subtle Background

Image with 30% opacity for better text readability

---

::: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

## Gradient Slide

Beautiful gradient backgrounds
```

**Old syntax (still supported):**

```markdown
<!-- .slide: data-background="#667eea" -->

## Purple Slide

---

<!-- .slide: data-background-image="https://example.com/image.jpg" -->

## Image Background

---

<!-- .slide: data-background-image="https://example.com/image.jpg" data-background-opacity="0.3" -->

## Subtle Background
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

## Navigation

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` / `↓` / `PgDn` | Next slide (or next fragment) |
| `←` / `↑` / `PgUp` | Previous slide (or previous fragment) |
| `T` | Toggle Table of Contents |
| `Home` | First slide |
| `End` | Last slide |
| `Esc` | Close TOC |

### Mouse Navigation

- **Mouse Wheel** - Scroll down to advance, scroll up to go back
- Works naturally with trackpads and mice
- Automatically debounced to prevent accidental triggers

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
│   ├── public/
│   │   └── presentations/        # User presentations (copied by CLI)
│   ├── package.json              # App dependencies
│   └── vite.config.js            # Vite configuration
├── mcp-server/                   # MCP server for Claude integration
│   ├── index.js                  # MCP server implementation
│   └── package.json              # MCP dependencies
├── cli.js                        # Command-line tool
├── package.json                  # Root package
├── CLI-ARCHITECTURE.md           # CLI design documentation
├── MCP-CLI-GUIDE.md              # MCP and CLI usage guide
├── ROADMAP.md                    # Product roadmap
└── README.md                     # This file
```

## Feature Parity

Slidedown 2.0 currently has **95% feature parity** with reveal.js:

### ✅ Implemented

- [x] Markdown slides with `---` and `--` separators
- [x] **Markdown-native syntax** - New `:::` directives and symbol-based fragments (no HTML!)
- [x] Fragment animations (12+ types with new symbol syntax)
- [x] Inline fragments (wrap text with symbols)
- [x] Math rendering (LaTeX/KaTeX)
- [x] Custom slide backgrounds (colors, images, gradients, opacity)
- [x] Code syntax highlighting (100+ languages)
- [x] Vertical slides (nested organization)
- [x] Table of contents sidebar
- [x] Keyboard navigation (arrows, space, page up/down)
- [x] Mouse wheel navigation
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

**New Syntax Demo** - See the latest markdown-native syntax in action:

```
http://localhost:5173?test=new-syntax-demo
```

This showcases:
- `:::` slide directives (colors, images, gradients, opacity)
- Symbol-based fragment animations (`^^^`, `vvv`, `--->`, `<---`, etc.)
- Inline fragments with surrounding markers
- All 12+ animation types
- Background images with opacity
- Math, code, tables, and more

**Comprehensive Example** - All features with HTML comment syntax:

```
http://localhost:5173?test=comprehensive
```

This includes:
- All fragment animation types (old syntax)
- Math equations (inline and block)
- Custom backgrounds (old syntax)
- Definition lists
- Code highlighting
- Tables, lists, blockquotes
- Vertical slides

### Building for Production

```bash
slidedown build
```

This creates optimized static files in `app/dist/` ready for deployment.

### CLI Commands

```bash
slidedown init [filename] [title]    # Create new presentation
slidedown serve [filename]            # Start dev server
slidedown build                       # Build for production
slidedown config [options]            # Create config file
slidedown help [command]              # Show help
```

See [CLI-ARCHITECTURE.md](CLI-ARCHITECTURE.md) for detailed CLI documentation.

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
- **New markdown-native syntax** - Clean symbol-based syntax (optional, HTML comments still work)
- **Enhanced backgrounds** - Support for gradients and opacity

### Markdown Compatibility

Most markdown remains the same:
- ✅ Slide separators (`---` and `--`) work identically
- ✅ All standard markdown is compatible
- ✅ Code blocks work the same
- ✅ Old HTML comment syntax still works
- 🆕 New symbol-based syntax available (`:::`, `^^^`, `vvv`, etc.)
- 🆕 Inline fragments with surrounding markers

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
