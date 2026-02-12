# MCP Server Installation Guide

How to install the Slidedown MCP server in different AI chat systems.

## Table of Contents
- [Claude Desktop (macOS/Windows)](#claude-desktop-macoswindows)
- [Claude Code (CLI)](#claude-code-cli)
- [Other MCP-Compatible Systems](#other-mcp-compatible-systems)
- [Testing the Installation](#testing-the-installation)
- [Troubleshooting](#troubleshooting)

---

## Claude Desktop (macOS/Windows)

Claude Desktop has built-in MCP support. You just need to configure it.

### 1. Install Slidedown

```bash
git clone https://github.com/adubinsky/slidedown.git
cd slidedown
npm run install-all
npm link  # Makes 'slidedown' command available globally
```

### 2. Find Your Claude Desktop Config File

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%/Claude/claude_desktop_config.json
```

### 3. Edit the Config File

Open the config file and add the Slidedown MCP server:

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": [
        "/FULL/PATH/TO/slidedown/mcp-server/index.js"
      ],
      "description": "Slidedown 2.0 - Markdown presentation tool"
    }
  }
}
```

**Important:** Replace `/FULL/PATH/TO/slidedown/` with the actual path where you cloned Slidedown.

**Example (macOS):**
```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": [
        "/Users/andrew/Code/slidedown/mcp-server/index.js"
      ],
      "description": "Slidedown 2.0 - Markdown presentation tool"
    }
  }
}
```

### 4. Restart Claude Desktop

Quit Claude Desktop completely (not just close the window) and restart it.

### 5. Verify Installation

In Claude Desktop, you should see the Slidedown MCP tools available. Try asking:

```
"Create a presentation about machine learning"
```

Claude should use the Slidedown MCP tools to generate the presentation.

---

## Claude Code (CLI)

Claude Code uses a different configuration file.

### 1. Install Slidedown

Same as above:
```bash
git clone https://github.com/adubinsky/slidedown.git
cd slidedown
npm run install-all
npm link
```

### 2. Find Your Claude Code Config

**Default location:**
```bash
~/.claude/config.json
```

Or check your Claude Code settings for the config file location.

### 3. Add MCP Server to Config

Edit `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/FULL/PATH/TO/slidedown/mcp-server/index.js"],
      "env": {}
    }
  }
}
```

### 4. Restart Claude Code

Exit and restart the Claude Code CLI.

### 5. Test It

```bash
claude
# Then ask: "Create a presentation about AI"
```

---

## Other MCP-Compatible Systems

The MCP (Model Context Protocol) is an open standard. Any system that implements MCP can use Slidedown.

### General MCP Server Configuration

Most MCP-compatible systems use a similar config format:

```json
{
  "mcpServers": {
    "slidedown": {
      "command": "node",
      "args": ["/path/to/slidedown/mcp-server/index.js"],
      "description": "Slidedown presentation tool"
    }
  }
}
```

### Known Compatible Systems

1. **Claude Desktop** (macOS, Windows, Linux) ✅
2. **Claude Code CLI** ✅
3. **Cursor** (check Cursor's MCP documentation)
4. **Continue.dev** (check their MCP integration docs)
5. **Any tool supporting MCP protocol** (see [MCP spec](https://modelcontextprotocol.io/))

### For Custom Integrations

If you're building your own MCP-compatible system:

1. **Start the MCP server:**
   ```bash
   node /path/to/slidedown/mcp-server/index.js
   ```

2. **Connect via stdio:**
   The MCP server communicates via standard input/output (stdio).

3. **Available tools:**
   - `read_markdown` - Read presentation files
   - `write_markdown` - Write/update presentations
   - `create_presentation` - Create new with template
   - `serve` - Start dev server
   - `build` - Build for production
   - `create_config` - Generate config file
   - `get_syntax_help` - Get syntax documentation

4. **See the MCP spec:**
   https://modelcontextprotocol.io/

---

## Testing the Installation

### Quick Test

Ask Claude (via Desktop or CLI):

```
"Create a simple presentation about space exploration with 5 slides"
```

Claude should:
1. Use `create_presentation` to make a new file
2. Use `write_markdown` to add content
3. Suggest running `slidedown serve` to preview

### Verify Tools Are Available

In Claude Desktop, you can check the available tools by asking:

```
"What MCP tools do you have access to?"
```

You should see the Slidedown tools listed.

### Manual Test

You can manually test the MCP server:

```bash
cd slidedown/mcp-server
node index.js
```

You should see:
```
MCP Server initialized: slidedown v2.0.0
Available tools: read_markdown, write_markdown, create_presentation, serve, build, create_config, get_syntax_help
```

---

## Troubleshooting

### "MCP server not found" or "Connection failed"

**Check:**
1. Node.js is installed: `node --version` (need v18+)
2. Full path is correct in config file
3. File exists: `ls /path/to/slidedown/mcp-server/index.js`
4. File is executable: `chmod +x /path/to/slidedown/mcp-server/index.js`

### "slidedown command not found"

**Fix:**
```bash
cd /path/to/slidedown
npm link
```

### Claude Desktop doesn't see the tools

**Steps:**
1. Verify config file syntax (valid JSON)
2. Check config file location is correct for your OS
3. **Quit Claude Desktop completely** (not just close window)
4. Restart Claude Desktop
5. Check Console/Logs for errors

**macOS logs:**
```bash
tail -f ~/Library/Logs/Claude/mcp*.log
```

### MCP server crashes

**Debug:**
```bash
# Run server manually to see errors
node /path/to/slidedown/mcp-server/index.js

# Check dependencies are installed
cd /path/to/slidedown/mcp-server
npm install
```

### Wrong file paths in responses

The MCP server operates relative to the Slidedown installation directory. If Claude tries to create files in the wrong place:

**Solution:**
1. Use the CLI instead for user presentations:
   ```bash
   cd ~/my-presentations
   slidedown init my-talk
   slidedown serve
   ```

2. Or tell Claude explicitly:
   ```
   "Create the presentation in /Users/andrew/Documents/my-talk.md"
   ```

---

## Best Practices

### For Development/Testing
Use the MCP server to quickly prototype presentations with Claude's help.

### For Production Presentations
Use the CLI directly:
```bash
cd ~/my-presentations
slidedown init
slidedown serve
# Edit presentation.md
slidedown build
```

### Hybrid Workflow
1. Use MCP to generate initial content
2. Copy to your presentation directory
3. Use CLI for serving and building
4. Use MCP for quick edits and suggestions

---

## Uninstalling

### Remove from Claude Desktop

1. Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Remove the `slidedown` entry from `mcpServers`
3. Restart Claude Desktop

### Remove Slidedown Completely

```bash
# Unlink CLI
npm unlink slidedown

# Remove files
rm -rf /path/to/slidedown
```

---

## Support

- **Documentation:** [README.md](README.md), [MCP-CLI-GUIDE.md](MCP-CLI-GUIDE.md)
- **Issues:** https://github.com/adubinsky/slidedown/issues
- **MCP Protocol:** https://modelcontextprotocol.io/
