# CLI Architecture

## Installation

To use the `slidedown` command globally:

```bash
cd /path/to/slidedown
npm link
```

Now `slidedown` works from any directory, just like `git` or `npm`.

## How It Works

Slidedown follows standard CLI tool patterns (like git, npm, hugo):

- **App code lives in ONE place** - Installed globally or in the repo
- **Presentations live ANYWHERE** - In your Documents/, project folders, etc.
- **CLI operates on current directory** - No need to copy app code for each presentation

## File Structure

```
# The Slidedown app (ONE location)
~/Code/slidedown/
├── app/                    # React app code
├── cli.js                  # Command-line tool
├── mcp-server/             # MCP integration
└── ...

# Your presentations (ANYWHERE)
~/Documents/presentations/
├── presentation.md         # Default presentation
├── sales-pitch.md          # Another presentation
└── ...
```

## Workflow

### 1. Create a Presentation

```bash
cd ~/Documents/presentations/
slidedown init my-presentation "My Awesome Talk"
```

This creates `my-presentation.md` in your CURRENT directory (not in the app source).

### 2. Serve It

```bash
slidedown serve my-presentation.md
```

Or just use the default:

```bash
slidedown serve  # Loads presentation.md
```

**What happens:**
1. CLI finds `my-presentation.md` in your current directory
2. Copies it to `app/public/presentations/presentation.md` (temporary)
3. Starts Vite dev server from the app location
4. Watches for changes and re-copies automatically
5. Opens http://localhost:5173

### 3. Edit and Preview

Edit `my-presentation.md` in your current directory with any editor. The dev server will:
- Detect changes via file watcher
- Re-copy the file automatically
- Hot-reload in the browser

### 4. Build for Production

```bash
slidedown build
```

Creates optimized static files in `app/dist/`.

## Benefits

✅ **Separation of concerns** - App code separate from user data
✅ **Standard CLI pattern** - Works like git, npm, hugo
✅ **Flexible** - Create presentations anywhere on your filesystem
✅ **No bloat** - Don't copy entire app for each presentation
✅ **Clean workflow** - Edit files where you want them

## Example: Fly.io Deployment

For deployment, you'd have a dedicated folder:

```bash
~/deployments/my-presentation/
├── presentation.md         # Your presentation
├── Dockerfile              # Deployment config
├── fly.toml               # Fly.io config
└── app/                   # Copy of Slidedown app (for deployment only)
```

The `app/` folder here is for deployment purposes - it gets bundled into the Docker container. But for local development, you just work in the root folder with your presentation.md.

## Migration from Old Approach

**Old (wrong):**
```bash
# Had to put presentations inside app source
slidedown/app/public/presentations/presentation.md
```

**New (correct):**
```bash
# Presentations anywhere, app code separate
~/Documents/my-talk/presentation.md
slidedown serve  # Works from current directory
```

## Technical Details

The `slidedown serve` command:
1. Uses `process.cwd()` to find current working directory
2. Looks for presentation file there (default: `presentation.md`)
3. Copies to `app/public/presentations/presentation.md`
4. Uses `fs.watch()` to detect changes and re-copy
5. Starts Vite dev server with `cwd: appDir`

This gives users the experience of editing files in their directory while working within Vite's security constraints (it can't serve files outside its root).
