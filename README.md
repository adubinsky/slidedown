# Slidedown

**Markdown-first presentations powered by [reveal.js](https://revealjs.com)**

Slidedown lets you create beautiful presentations by writing Markdown. Focus on your content while reveal.js handles the rest.

---

## Built on reveal.js

Slidedown is built on top of [reveal.js](https://revealjs.com) by [Hakim El Hattab](https://hakim.se). All the powerful features of reveal.js are available - nested slides, code highlighting, speaker notes, PDF export, and more.

For advanced features and configuration, see the [reveal.js documentation](https://revealjs.com/markup/).

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/adubinsky/slidedown.git
cd slidedown

# Run setup
./setup.sh

# Start the development server
npm start
```

Open http://localhost:8000 to see the example presentation.

---

## Creating Presentations

### Folder Structure

```
slidedown/
├── input/                    # Your presentation sources
│   └── my-presentation/
│       ├── slides.md         # Your slides in Markdown
│       └── images/           # Images for your presentation
├── output/                   # Generated presentations (gitignored)
└── mcp-server/               # MCP server for AI assistance
```

### Writing Slides

Create your slides in `input/<name>/slides.md`:

```markdown
# Title Slide

Your opening content

---

## Second Slide

Use `---` for horizontal slides

--

### Vertical Slide

Use `--` for vertical (nested) slides

---

## Code Examples

```javascript
const greeting = 'Hello, World!';
console.log(greeting);
```

---

## Speaker Notes

Content visible to audience

Note: This text only appears in speaker view (press 'S')
```

### Slide Attributes

Add custom backgrounds and transitions with HTML comments:

```markdown
<!-- .slide: data-background="#4a86e8" -->
## Blue Background

<!-- .slide: data-background-image="images/photo.jpg" -->
## Image Background
```

---

## MCP Server

Slidedown includes an MCP (Model Context Protocol) server for AI-assisted slide creation.

### Setup

Add to your Claude Desktop or MCP client configuration:

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/path/to/slidedown/mcp-server/index.js"]
    }
  }
}
```

### Available Tools

- **read_markdown** - Read a markdown file with syntax documentation
- **build_presentation** - Build HTML presentation from markdown
- **serve** - Start the development server

---

## Available Themes

Slidedown includes all reveal.js themes:

- `black` (default)
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`
- `dracula`

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `↑` / `↓` | Navigate vertical slides |
| `S` | Speaker notes view |
| `O` | Overview mode |
| `F` | Fullscreen |
| `Esc` | Exit overview/fullscreen |

---

## License

MIT License

Copyright (c) 2011-2024 Hakim El Hattab (reveal.js)
Copyright (c) 2024 Alex Dubinsky (Slidedown modifications)

See [LICENSE](LICENSE) for details.
