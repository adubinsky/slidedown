# Slidedown

**Markdown-first presentations powered by [reveal.js](https://revealjs.com)**

Slidedown helps you create beautiful presentations with your AI by converting your files into formatted Markdown for you to work on, then converting that into HTML slide shows. HTML slides are shown using the excellent reveal.js.
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

# Run setup (installs dependencies and builds assets)
./setup.sh

# Start the development server
npm start
```

Open http://localhost:8000 to see the example presentation.

---

## Creating Presentations../

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

<!-- .slide: data-transition="fade" -->
## Fade Transition
```

### Fragments (Incremental Reveal)

Reveal content step by step:

```markdown
- First point <!-- .element: class="fragment" -->
- Second point <!-- .element: class="fragment fade-up" -->
- Third point <!-- .element: class="fragment highlight-red" -->
```

Fragment styles: `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `grow`, `shrink`, `strike`, `highlight-red`, `highlight-green`, `highlight-blue`

---

## MCP Server

Slidedown includes an MCP (Model Context Protocol) server that enables AI assistants to help create and manage presentations. The MCP server provides three tools:

| Tool                 | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `read_markdown`      | Read a markdown file with Slidedown syntax documentation |
| `build_presentation` | Build HTML presentation from markdown source             |
| `serve`              | Start the development server to preview presentations    |

### Setting Up the MCP Server

The MCP server is located in the `mcp-server/` directory and is automatically set up when you run `./setup.sh`.

#### Claude Code (CLI)

Add the following to your Claude Code MCP settings file (`~/.claude/settings.json` or project-level `.claude/settings.json`):

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/absolute/path/to/slidedown/mcp-server/index.js"]
    }
  }
}
```

To find the absolute path:
```bash
cd slidedown && echo "$(pwd)/mcp-server/index.js"
```

After adding, restart Claude Code or run `/mcp` to verify the server is connected.

#### Claude Desktop App

Edit your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/absolute/path/to/slidedown/mcp-server/index.js"]
    }
  }
}
```

Restart Claude Desktop after saving.

#### Cursor

Add to your Cursor MCP settings (Settings > MCP Servers):

```json
{
  "slidedown": {
    "command": "node",
    "args": ["/absolute/path/to/slidedown/mcp-server/index.js"]
  }
}
```

#### Windsurf

Add to your Windsurf MCP configuration:

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/absolute/path/to/slidedown/mcp-server/index.js"]
    }
  }
}
```

#### Other MCP-Compatible Tools

Any tool that supports the Model Context Protocol can use the Slidedown MCP server. The general configuration pattern is:

```json
{
  "command": "node",
  "args": ["/absolute/path/to/slidedown/mcp-server/index.js"]
}
```

### Using the MCP Server

Once configured, you can ask your AI assistant to:

- **Read slides**: "Read my presentation at input/example/slides.md"
- **Create slides**: "Create a new presentation about [topic]"
- **Build presentations**: "Build my presentation with the dracula theme"
- **Start the server**: "Start the slidedown server so I can preview"

The AI will have access to the Slidedown syntax documentation and can help you write properly formatted slides.

---

## Building Presentations

### Using the MCP Server

Ask your AI assistant: "Build my presentation from input/my-talk/slides.md with the moon theme"

### Manual Build

The development server automatically serves presentations from the `input/` directory. For standalone builds:

```bash
# The MCP server's build_presentation tool creates standalone HTML in output/
node -e "
const build = require('./mcp-server/index.js');
// Use the build_presentation tool programmatically
"
```

Or simply copy your markdown file to the `output/` directory with the generated HTML template.

---

## Available Themes

Slidedown includes all reveal.js themes:

| Theme       | Description                 |
| ----------- | --------------------------- |
| `black`     | Default, dark background    |
| `white`     | Light background            |
| `league`    | Gray background, serif font |
| `beige`     | Cream background            |
| `sky`       | Blue gradient background    |
| `night`     | High contrast dark          |
| `serif`     | Elegant serif fonts         |
| `simple`    | Minimal white               |
| `solarized` | Solarized color scheme      |
| `blood`     | Dark red accents            |
| `moon`      | Dark blue background        |
| `dracula`   | Dracula color scheme        |

---

## Keyboard Shortcuts

| Key           | Action                   |
| ------------- | ------------------------ |
| `→` / `Space` | Next slide               |
| `←`           | Previous slide           |
| `↑` / `↓`     | Navigate vertical slides |
| `S`           | Speaker notes view       |
| `O`           | Overview mode            |
| `F`           | Fullscreen               |
| `Esc`         | Exit overview/fullscreen |
| `B` / `.`     | Pause/blackout           |
| `?`           | Show keyboard shortcuts  |

---

## Advanced Features

### PDF Export

Open your presentation with `?print-pdf` appended to the URL:

```
http://localhost:8000/output/my-presentation/?print-pdf
```

Then use your browser's print function (Ctrl/Cmd + P) and save as PDF.

### Speaker Notes

Press `S` to open speaker view in a new window. This shows:
- Current slide
- Next slide preview
- Speaker notes
- Timer

### Embedding Media

```markdown
<!-- Video -->
<video data-autoplay src="video.mp4"></video>

<!-- YouTube -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

<!-- Audio -->
<audio data-autoplay src="audio.mp3"></audio>
```

---

## Troubleshooting

### MCP Server Not Connecting

1. Verify the path is absolute and correct
2. Ensure Node.js is installed (`node --version`)
3. Check MCP server dependencies are installed (`cd mcp-server && npm install`)
4. Restart your AI tool after configuration changes

### Presentations Not Loading

1. Ensure the development server is running (`npm start`)
2. Check the browser console for errors
3. Verify your markdown syntax (use `---` for slides, not `***`)

### Images Not Showing

1. Place images in the `images/` subdirectory next to your `slides.md`
2. Reference them with relative paths: `![Alt](images/photo.png)`

---

## License

MIT License

Copyright (c) 2011-2024 Hakim El Hattab (reveal.js)
Copyright (c) 2026 Andrew Dubinsky (Slidedown)

See [LICENSE](LICENSE) for details.
