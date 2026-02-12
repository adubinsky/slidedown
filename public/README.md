# Public Folder

This folder contains all user-facing presentations, demos, and training content.

## Structure

```
public/
├── presentations/           # User presentations (CLI copies here)
│   └── presentation.md     # Default presentation from 'slidedown serve'
├── demos/                   # Demo presentations
│   ├── new-syntax-demo.md  # Showcases new syntax
│   └── comprehensive.md    # All features demo
└── training/                # Training presentations
    └── getting-started.md  # Introduction to Slidedown
```

## How It Works

### User Presentations (`presentations/`)

When you run `slidedown serve` from any directory, the CLI:
1. Finds your `presentation.md` in your current directory
2. Copies it to `public/presentations/presentation.md`
3. Serves it at `http://localhost:5173`

**This folder is temporary** - your actual presentation lives in your working directory.

### Demos (`demos/`)

Access with `?demo=` parameter or CLI command:

```
http://localhost:5173?demo=new-syntax-demo
http://localhost:5173?demo=comprehensive
```

Or use the CLI:
```bash
slidedown demo new-syntax-demo
slidedown demo comprehensive
```

These demonstrate Slidedown features and syntax.

### Training (`training/`)

Access with `?training=` parameter or CLI command:

```
http://localhost:5173?training=getting-started
```

Or use the CLI:
```bash
slidedown training getting-started
slidedown training  # Defaults to getting-started
```

Step-by-step learning content for mastering Slidedown.

## Adding Your Own Content

1. Create a markdown file in `public/demos/` or `public/training/`
2. Access it with the appropriate parameter

Example:
```bash
# Create demo
echo "# My Demo\n\n---\n\n## Slide 2" > public/demos/my-demo.md

# View it
slidedown demo my-demo
# or
open http://localhost:5173?demo=my-demo
```

## CLI Commands

```bash
slidedown serve            # Serve your presentation
slidedown demo [name]      # Open a demo
slidedown training [name]  # Open training content
```

## File Organization

**Why this structure?**
- ✅ Easy to find - everything in one `public/` folder
- ✅ Clear separation - presentations / demos / training
- ✅ Simple to spin up - CLI commands for everything
- ✅ Clean architecture - user data separate from app code
