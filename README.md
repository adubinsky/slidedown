# Slidedown

**Markdown-first presentations powered by [reveal.js](https://revealjs.com)**

Slidedown helps you create beautiful presentations with your AI by converting your files into formatted Markdown for you to work on, then converting that into HTML slide shows. HTML slides are shown using the excellent reveal.js.

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/adubinsky/slidedown/main/install.sh | bash
```

Then create presentations from anywhere:

```bash
slidedown build slides.md my-presentation moon
slidedown validate slides.md
```

---

## Built on reveal.js

Slidedown is built on top of [reveal.js](https://revealjs.com) by [Hakim El Hattab](https://hakim.se). All the powerful features of reveal.js are available - nested slides, code highlighting, speaker notes, PDF export, and more.

For advanced features and configuration, see the [reveal.js documentation](https://revealjs.com/markup/).

---

## Installation

### Automatic Install (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/adubinsky/slidedown/main/install.sh | bash
```

This will:
- Install slidedown to `~/.slidedown`
- Add the `slidedown` command to your PATH
- Set up all dependencies

### Manual Install

```bash
# Clone the repository
git clone https://github.com/adubinsky/slidedown.git
cd slidedown

# Run setup (installs dependencies and builds assets)
./setup.sh

# Install the CLI globally
./install.sh
```

### Uninstall

```bash
curl -fsSL https://raw.githubusercontent.com/adubinsky/slidedown/main/uninstall.sh | bash
```

Or if installed locally: `./uninstall.sh`

---

## Quick Start

Once installed, you can use slidedown from anywhere:

```bash
# Create a presentation directory
mkdir -p ~/presentations/my-talk
cd ~/presentations/my-talk

# Create your slides
echo "# My Presentation" > slides.md
echo "---" >> slides.md
echo "## First Slide" >> slides.md

# Build the presentation
slidedown build slides.md my-talk moon

# Start the preview server (from slidedown directory)
cd ~/.slidedown && npm start
```

Open http://localhost:8000/output/my-talk/ to see your presentation.

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
      "args": ["/Users/YOUR_USERNAME/.slidedown/mcp-server/index.js"]
    }
  }
}
```

**Note**: Replace `YOUR_USERNAME` with your actual username, or use the full path to your slidedown installation.

To find the absolute path:
```bash
echo "$HOME/.slidedown/mcp-server/index.js"
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
      "args": ["/Users/YOUR_USERNAME/.slidedown/mcp-server/index.js"]
    }
  }
}
```

**Note**: Replace `YOUR_USERNAME` with your actual username.

Restart Claude Desktop after saving.

#### Cursor

Add to your Cursor MCP settings (Settings > MCP Servers):

```json
{
  "slidedown": {
    "command": "node",
    "args": ["/Users/YOUR_USERNAME/.slidedown/mcp-server/index.js"]
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
      "args": ["/Users/YOUR_USERNAME/.slidedown/mcp-server/index.js"]
    }
  }
}
```

#### Other MCP-Compatible Tools

Any tool that supports the Model Context Protocol can use the Slidedown MCP server. The general configuration pattern is:

```json
{
  "command": "node",
  "args": ["/Users/YOUR_USERNAME/.slidedown/mcp-server/index.js"]
}
```

Replace `YOUR_USERNAME` with your actual username, or `%USERPROFILE%\.slidedown\mcp-server\index.js` on Windows.

### Using the MCP Server

Once configured, you can ask your AI assistant to:

- **Read slides**: "Read my presentation at input/example/slides.md"
- **Create slides**: "Create a new presentation about [topic]"
- **Build presentations**: "Build my presentation with the dracula theme"
- **Start the server**: "Start the slidedown server so I can preview"

The AI will have access to the Slidedown syntax documentation and can help you write properly formatted slides.

---

## Building Presentations

### Using the CLI (Recommended)

After installation, use the `slidedown` command from anywhere:

```bash
# Build a presentation with default theme (black)
slidedown build slides.md my-talk

# Build with a specific theme
slidedown build slides.md my-talk moon

# Validate markdown before building
slidedown validate slides.md

# See all options
slidedown help
```

**Note**: If you haven't installed globally, use `node cli.js` from the slidedown directory instead.

The CLI will:
- Create the output directory
- Copy markdown and images
- Generate HTML wrapper with reveal.js configuration
- Create necessary symlinks to dist/ and plugin/ directories

### Using the MCP Server

Ask your AI assistant: "Build my presentation from input/my-talk/slides.md with the moon theme"

The AI will use the `build_presentation` tool to build your presentation automatically.

### Manual Build

The development server automatically serves presentations from the `input/` directory. For standalone builds, use the CLI tool above.

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
