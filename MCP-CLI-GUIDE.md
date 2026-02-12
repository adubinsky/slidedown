# Slidedown MCP Server & CLI Guide

Complete guide for using Slidedown with Claude (via MCP) and the command-line interface.

## Table of Contents
- [Command-Line Interface (CLI)](#command-line-interface-cli)
- [MCP Server for Claude](#mcp-server-for-claude)
- [Quick Start Examples](#quick-start-examples)

---

## Command-Line Interface (CLI)

### Installation

```bash
# Clone the repository
git clone https://github.com/adubinsky/slidedown.git
cd slidedown

# Install all dependencies
npm run install-all

# Link the CLI globally
npm link
```

Now `slidedown` works from any directory!

### How It Works

Slidedown follows standard CLI patterns (like git, npm, hugo):
- **App code lives in ONE place** - The slidedown installation
- **Presentations live ANYWHERE** - In your Documents/, project folders, etc.
- **CLI operates on current directory** - No need to copy app code

See [CLI-ARCHITECTURE.md](CLI-ARCHITECTURE.md) for detailed architecture documentation.

### Commands

#### `slidedown init`
Create a new presentation in the current directory.

```bash
slidedown init [filename] [title]

# Examples:
slidedown init                           # Creates presentation.md
slidedown init my-presentation           # Creates my-presentation.md
slidedown init sales-pitch "Q4 Sales"   # Creates sales-pitch.md with title
```

Creates a markdown file in your **current directory** with:
- New `:::` syntax examples
- Symbol-based fragment animations (`^^^`, `vvv`, `--->`, etc.)
- Background images with opacity
- Math equations
- Code highlighting
- All Slidedown features demonstrated

#### `slidedown serve`
Start the development server from the current directory.

```bash
slidedown serve [filename]

# Examples:
cd ~/Documents/my-talks/
slidedown serve                      # Serves presentation.md
slidedown serve sales-pitch.md       # Serves sales-pitch.md
```

Opens at: `http://localhost:5173`

**What happens:**
1. Finds presentation file in current directory
2. Copies to app temporarily
3. Starts dev server with hot reload
4. Watches for changes and auto-reloads

**Features:**
- Live reload on file changes
- Hot module replacement (HMR)
- Automatic browser refresh
- Edit files in YOUR directory, not app source

#### `slidedown build`
Build the presentation for production deployment.

```bash
slidedown build
```

Creates optimized static files in `app/dist/` ready to deploy.

#### `slidedown config`
Create a configuration file for branding and settings.

```bash
slidedown config [options]

# Options:
--logo <path>          Path to company logo
--position <pos>       Logo position: top-left, top-right, bottom-left, bottom-right
--background <color>   Default background color

# Examples:
slidedown config --logo /logo.png --position bottom-right
slidedown config --background #667eea
```

Creates `app/slidedown.config.json` with:
- Company branding (logo, position, size)
- Default settings (background, transitions, animations)
- Theme customization (colors, fonts)
- Feature toggles

#### `slidedown help`
Show help for commands.

```bash
slidedown help [command]

# Examples:
slidedown help           # Show all commands
slidedown help init      # Show help for init command
```

---

## MCP Server for Claude

The MCP (Model Context Protocol) server allows Claude to create, edit, and manage Slidedown presentations.

### Setup for Claude Desktop/CLI

1. **Install the MCP server:**
   ```bash
   cd mcp-server
   npm install
   ```

2. **Configure Claude to use the server:**

   Add to your Claude configuration file (usually `~/.claude/config.json` or Claude Desktop settings):

   ```json
   {
     "mcpServers": {
       "slidedown": {
         "command": "node",
         "args": ["/path/to/slidedown/mcp-server/index.js"],
         "description": "Slidedown 2.0 presentation tool"
       }
     }
   }
   ```

3. **Restart Claude** to load the new MCP server.

### Available MCP Tools

#### `read_markdown`
Read a markdown presentation file.

```javascript
// Claude can use this to read existing presentations
{
  "name": "read_markdown",
  "arguments": {
    "path": "app/src/test-content/my-presentation.md"
  }
}
```

Returns the markdown content plus complete syntax documentation.

#### `write_markdown`
Write or update a markdown presentation file.

```javascript
// Claude can use this to create/edit presentations
{
  "name": "write_markdown",
  "arguments": {
    "path": "app/src/test-content/new-presentation.md",
    "content": "# My Presentation\n\n---\n\n## Slide 2..."
  }
}
```

#### `create_presentation`
Create a new presentation with a starter template.

```javascript
{
  "name": "create_presentation",
  "arguments": {
    "name": "quarterly-review",
    "title": "Q4 2026 Review"
  }
}
```

Creates a complete starter presentation with examples of all features.

#### `serve`
Start the development server.

```javascript
{
  "name": "serve",
  "arguments": {
    "markdown_file": "my-presentation"  // optional
  }
}
```

#### `build`
Build the presentation for production.

```javascript
{
  "name": "build",
  "arguments": {}
}
```

#### `create_config`
Create a configuration file with branding and settings.

```javascript
{
  "name": "create_config",
  "arguments": {
    "logo_path": "/logo.png",
    "logo_position": "bottom-right",
    "default_background": "#667eea"
  }
}
```

#### `get_syntax_help`
Get comprehensive syntax reference.

```javascript
{
  "name": "get_syntax_help",
  "arguments": {
    "topic": "fragments"  // or "backgrounds", "math", "tables", "all"
  }
}
```

---

## Quick Start Examples

### Example 1: Create and Preview a Presentation

**Using CLI:**
```bash
# Create a folder for your presentation
mkdir ~/my-talks
cd ~/my-talks

# Create the presentation
slidedown init my-first-presentation "My First Deck"

# Start the server
slidedown serve my-first-presentation.md
```

Opens at `http://localhost:5173` with live reload.

**Using Claude with MCP:**
```
You: "Create a presentation called 'my-first-presentation' about React hooks"

Claude will:
1. Use create_presentation tool to generate the starter
2. Use write_markdown to add your content
3. Use serve tool to preview it
```

### Example 2: Add Company Branding

**Using CLI:**
```bash
# 1. Place your logo in app/public/
cp ~/Downloads/company-logo.png /path/to/slidedown/app/public/logo.png

# 2. Create config
slidedown config --logo /logo.png --position bottom-right --background #1a1a1a

# 3. Restart server (from your presentation directory)
cd ~/my-talks
slidedown serve
```

### Example 3: Edit Existing Presentation

**Using Claude with MCP:**
```
You: "Add a new slide about performance optimization to my-presentation.md"

Claude will:
1. Read the existing file with read_markdown
2. Add the new slide using the ::: and ^^^ syntax
3. Write it back with write_markdown
4. Suggest running serve to preview
```

### Example 4: Build for Production

**Using CLI:**
```bash
# Build
slidedown build

# Output in app/dist/
# Deploy to your web server:
rsync -av app/dist/ user@server:/var/www/presentation/
```

---

## Slidedown 2.0 Syntax Quick Reference

### Slide Separators
- `---` - New horizontal slide
- `--` - New vertical slide (nested)

### Slide Directives (New!)
```markdown
::: #667eea                    # Background color
::: https://...image.jpg       # Background image
::: opacity:0.3                # Image opacity
::: linear-gradient(...)       # Gradient background
```

### Fragment Animations (New!)
```markdown
- ^^^ Fades up
- vvv Fades down
- ---> Slides right
- <--- Slides left
- +++ Grows
- ... Shrinks
- ~~~ Strikes through
- >>red Highlights red
- >>green Highlights green
- >>blue Highlights blue
- >> Basic fade in
```

### Inline Fragments (New!)
```markdown
This has +++emphasized+++ and ^^^animated^^^ text.
```

### Math
```markdown
Inline: $E = mc^2$

Block:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### Code Blocks
````markdown
```javascript
console.log("Hello!");
```
````

---

## Troubleshooting

### CLI Issues

**Command not found:**
```bash
# Use node directly
node cli.js help

# Or link globally
npm link
```

**Server won't start:**
```bash
# Install dependencies
cd app && npm install

# Check if port 5173 is available
lsof -i :5173
```

### MCP Issues

**Claude can't find the tools:**
- Check that the MCP server path in config is correct
- Restart Claude after configuration changes
- Verify the server runs: `node mcp-server/index.js`

**Tools fail to execute:**
- Make sure dependencies are installed: `npm run install-all`
- Check file paths are correct (absolute or relative to slidedown root)

---

## Advanced Usage

### Custom Config Example

Create `app/slidedown.config.json`:

```json
{
  "version": "2.0",
  "branding": {
    "logo": "/company-logo.png",
    "logoPosition": "bottom-right",
    "logoSize": "100px"
  },
  "defaults": {
    "background": "#1a1a1a",
    "transition": "slide",
    "fragmentAnimation": "fade-up"
  },
  "theme": {
    "colors": {
      "primary": "#ff6b6b",
      "secondary": "#4ecdc4",
      "accent": "#ffe66d"
    }
  }
}
```

### Deployment Options

**Static hosting (Netlify, Vercel, GitHub Pages):**
```bash
slidedown build
# Deploy app/dist/
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY app/ ./
RUN npm install && npm run build
CMD ["npx", "serve", "dist"]
```

---

## Support & Resources

- **Documentation:** [README.md](README.md)
- **Syntax Guide:** [README.md#new-markdown-native-syntax](README.md#new-markdown-native-syntax)
- **Roadmap:** [ROADMAP.md](ROADMAP.md)
- **Issues:** https://github.com/adubinsky/slidedown/issues
- **Contact:** andrew@cloudze.com

---

**Slidedown 2.0** - Making presentations with Claude, easier than ever!
