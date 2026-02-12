# Getting Started with Slidedown

Welcome to Slidedown! Let's learn the basics.

---

## What is Slidedown?

Slidedown turns markdown into beautiful presentations.

- ^^^ Write in markdown
- vvv See it as slides
- ---> No HTML needed

---

## Basic Slides

Separate slides with three dashes:

```markdown
# Slide 1

Content here

---

# Slide 2

More content
```

**Try it:** Use arrow keys or space to navigate

---

## Adding Backgrounds

Use the `:::` directive:

```markdown
::: #667eea

## Purple Background

This slide has a purple background!
```

---

::: #667eea

## Purple Background

This slide has a purple background!

See? Simple as that!

---

## Fragment Animations

Make content appear step-by-step:

- >> First item fades in
- ^^^ Second item slides up
- vvv Third item slides down
- ---> Fourth item slides from right

**Try it:** Press → or Space to reveal each item

---

## More Fragment Symbols

Different symbols = different animations:

- `^^^` - Fade up
- `vvv` - Fade down
- `--->` - Slide from right
- `<---` - Slide from left
- `+++` - Grow
- `...` - Shrink
- `>>` - Basic fade

---

## Inline Fragments

Wrap text for +++emphasis+++ and ^^^effects^^^.

```markdown
This has +++emphasized+++ text
```

---

## Background Images

Add images with opacity:

```markdown
::: https://images.unsplash.com/photo-...
::: opacity:0.3

## Title on Image

Content stays readable!
```

---

::: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
::: opacity:0.3

## Beautiful Backgrounds

Images with adjustable opacity keep text readable.

---

## Code Highlighting

Code blocks get automatic syntax highlighting:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('Slidedown'));
```

Over 100 languages supported!

---

## Math Support

Inline math: $E = mc^2$

Block equations:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

Full LaTeX support via KaTeX!

---

## Tables

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Fragments | ✅ |
| Math | ✅ |
| Code | ✅ |
| Backgrounds | ✅ |

Everything just works!

---

## Navigation Keys

| Key | Action |
|-----|--------|
| `→` `Space` `↓` | Next slide/fragment |
| `←` `↑` | Previous slide/fragment |
| `T` | Toggle Table of Contents |
| `Home` | First slide |
| `End` | Last slide |

**Pro tip:** Mouse wheel works too!

---

## Creating Your First Deck

```bash
# Create a folder
mkdir ~/my-presentation
cd ~/my-presentation

# Initialize
slidedown init

# Edit the markdown
nano presentation.md

# Serve it
slidedown serve
```

Opens at `http://localhost:5173`

---

## Editing Workflow

1. Open `presentation.md` in your editor
2. Make changes
3. Save the file
4. Browser auto-reloads

**That's it!** No build step, just edit and see.

---

## Building for Production

When you're ready to deploy:

```bash
slidedown build
```

Creates static files in `app/dist/` ready for:
- Fly.io
- Netlify
- GitHub Pages
- Any static host

---

## Next Steps

**Try these examples:**
- `?test=new-syntax-demo` - See all syntax features
- `?test=comprehensive` - Full feature showcase

**Read the docs:**
- [README.md](../../README.md) - Complete documentation
- [CLI-ARCHITECTURE.md](../../CLI-ARCHITECTURE.md) - How it works
- [MCP-INSTALLATION.md](../../MCP-INSTALLATION.md) - AI integration

---

## Tips & Tricks

- ^^^ Use fragments for progressive disclosure
- vvv Add backgrounds for visual impact
- ---> Keep slides simple (one idea per slide)
- <--- Code blocks auto-highlight
- +++ Math renders beautifully

---

# You're Ready! +++

Start creating amazing presentations with Slidedown.

**Happy presenting!** ^^^

---

## Resources

- **GitHub:** https://github.com/adubinsky/slidedown
- **Syntax Reference:** See the examples
- **Community:** Open an issue for help
- **License:** AGPL v3 (free for non-commercial)

Now go make something awesome! 🚀
