# Welcome to Slidedown

Create beautiful presentations with Markdown

---

## What is Slidedown?

A markdown-first presentation framework built on reveal.js

- Write slides in Markdown
- Focus on content, not formatting
- Full reveal.js power when you need it

Note: These are speaker notes. Press 'S' to open speaker view.

---

## Slide Separators

Use `---` for horizontal slides

Use `--` for vertical slides (nested below)

--

### This is a Vertical Slide

Navigate down to see more, or right to continue

--

### Another Vertical Slide

Great for diving deeper into a topic

---

## Code Highlighting

```javascript
// Syntax highlighting works automatically
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('World'));
```

---

## Multiple Languages

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```bash
# Shell commands
npm install
npm start
```

---

<!-- .slide: data-background="#4a86e8" -->

## Slide Attributes

This slide has a custom background color

Use HTML comments for slide-level settings

---

<!-- .slide: data-background-image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920" data-background-opacity="0.3" -->

## Background Images

You can use images as backgrounds too

---

## Lists and Formatting

**Bold text** and *italic text*

- Bullet points
- Work as expected
  - With nesting

1. Numbered lists
2. Also work
3. Perfectly

---

## Fragments

Build slides incrementally:

- First point <!-- .element: class="fragment" -->
- Second point <!-- .element: class="fragment" -->
- Third point <!-- .element: class="fragment" -->

---

## Tables

| Feature | Supported |
|---------|-----------|
| Markdown | Yes |
| Code blocks | Yes |
| Speaker notes | Yes |
| Themes | Yes |

---

## Blockquotes

> "The best way to predict the future is to create it."
>
> — Peter Drucker

---

## Images

![Placeholder](https://via.placeholder.com/400x200/4a86e8/ffffff?text=Your+Image+Here)

Local images go in the `images/` folder

---

## Math (with MathJax plugin)

When enabled, you can write equations:

$E = mc^2$

$$\sum_{i=1}^{n} x_i = x_1 + x_2 + ... + x_n$$

---

## Links

- [Slidedown Repository](https://github.com/adubinsky/slidedown)
- [reveal.js Documentation](https://revealjs.com)
- [Markdown Guide](https://www.markdownguide.org)

---

## Getting Started

1. Create your slides in `input/your-presentation/slides.md`
2. Run `npm start` to preview
3. Use the MCP server for AI assistance

---

# Questions?

Thank you for using Slidedown!

Note: Final speaker note - remember to thank your audience!
