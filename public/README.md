# Public Folder

This folder contains all user-facing presentations and examples.

## Structure

```
public/
├── presentations/           # User presentations (CLI copies here)
│   └── presentation.md     # Default presentation from 'slidedown serve'
├── examples/                # Example presentations
│   ├── new-syntax-demo.md  # Showcases new syntax
│   └── comprehensive.md    # All features demo
└── tutorials/               # Interactive tutorials (future)
    └── getting-started.md  # Introduction to Slidedown
```

## How It Works

### User Presentations (`presentations/`)

When you run `slidedown serve` from any directory, the CLI:
1. Finds your `presentation.md` in your current directory
2. Copies it to `public/presentations/presentation.md`
3. Serves it at `http://localhost:5173`

**This folder is temporary** - your actual presentation lives in your working directory.

### Examples (`examples/`)

Access with `?test=` parameter:

```
http://localhost:5173?test=new-syntax-demo
http://localhost:5173?test=comprehensive
```

These demonstrate Slidedown features and syntax.

### Tutorials (`tutorials/`)

Access with `?tutorial=` parameter (future):

```
http://localhost:5173?tutorial=getting-started
```

Step-by-step learning content.

## Adding Your Own Examples

1. Create a markdown file in `public/examples/`
2. Access it with `?test=your-filename`

Example:
```bash
# Create example
echo "# My Example\n\n---\n\n## Slide 2" > public/examples/my-example.md

# View it
open http://localhost:5173?test=my-example
```

## File Organization

**Why this structure?**
- ✅ Easy to find - everything in one `public/` folder
- ✅ Clear separation - presentations / examples / tutorials
- ✅ Simple to spin up - all examples in one place
- ✅ Clean architecture - user data separate from app code
