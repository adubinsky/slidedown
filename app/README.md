# Slidedown v2 - React App

This is the new Slidedown presentation viewer built with React, Vite, and Tailwind CSS.

## Features

- ✅ Custom slide renderer (no reveal.js dependency)
- ✅ Tailwind CSS styling
- ✅ Table of Contents slideout sidebar
- ✅ Smooth animations with Framer Motion
- ✅ Full keyboard navigation
- ✅ Markdown support with code highlighting
- ✅ Vertical slides (nested slides)
- ✅ Progress bar
- ✅ Slide counter

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `Space` | Next slide |
| `←` `↑` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `T` | Toggle Table of Contents |
| `ESC` | Close TOC |

## Architecture

```
src/
├── components/
│   ├── Presentation.jsx    # Main presentation controller
│   ├── Slide.jsx           # Individual slide renderer
│   ├── Navigation.jsx      # Navigation controls
│   └── TOC.jsx            # Table of contents sidebar
├── lib/
│   └── markdown-parser.js # Markdown parsing utilities
├── App.jsx                # Root component
├── main.jsx              # Entry point
└── index.css             # Tailwind + custom styles
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **react-markdown** - Markdown rendering
- **rehype-highlight** - Code syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown

## Next Steps

- [ ] Markdown editor with live preview
- [ ] Theme customization
- [ ] Single-file export
- [ ] Presentation library/dashboard
- [ ] Speaker notes view
- [ ] PDF export
- [ ] Load markdown from file/URL
- [ ] Custom backgrounds and transitions
- [ ] Fragment animations
- [ ] Image support
- [ ] Mobile responsiveness
