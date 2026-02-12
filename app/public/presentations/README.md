# Presentations Folder

## Quick Start

Simply drop your markdown file here as `presentation.md` and it will load automatically when you visit `http://localhost:5173`

## Usage

**Default presentation:**
```bash
# Place your markdown here:
app/public/presentations/presentation.md

# Opens automatically at:
http://localhost:5173
```

**Multiple presentations:**
```bash
# Save with any name:
app/public/presentations/my-talk.md
app/public/presentations/sales-pitch.md

# Access with:
http://localhost:5173?md=presentations/my-talk.md
http://localhost:5173?md=presentations/sales-pitch.md
```

**Test content (for development):**
```bash
# Still works:
http://localhost:5173?test=new-syntax-demo
http://localhost:5173?test=comprehensive
```

## File Structure

```
app/public/presentations/
├── presentation.md       # Default (loads at /)
├── README.md            # This file
└── [your-other-files].md # Additional presentations
```

## Deployment

When deploying to Fly.io or other hosts:

1. Copy your presentations to this folder
2. Build: `npm run build`
3. Deploy: The default presentation loads at your root URL

## Examples

**Simple workflow:**
```bash
# 1. Edit your presentation
nano app/public/presentations/presentation.md

# 2. Preview (auto-reloads on save)
npm run dev

# 3. Open browser
open http://localhost:5173
```

That's it! No parameters, no deep folder structure.
