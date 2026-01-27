import { useState, useEffect } from 'react';
import Presentation from './components/Presentation';

// Sample markdown for testing
const sampleMarkdown = `# Slidedown v2

Welcome to the new Slidedown

---

## What's New?

- Custom renderer (no reveal.js dependency)
- Tailwind CSS styling
- Table of Contents sidebar
- Smooth animations
- Keyboard navigation

---

## Navigation

Use these keys to navigate:

- **Arrow keys** or **Space**: Next/Previous slide
- **T**: Toggle Table of Contents
- **Home/End**: First/Last slide
- **ESC**: Close TOC

---

## Code Examples

Here's some JavaScript:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

---

## Markdown Support

> This is a blockquote with **bold** and *italic* text

- Bullet points
- With multiple items
- And nested content

1. Numbered lists
2. Work too
3. Of course!

---

## Vertical Slides

This is a horizontal slide

--

### Going Down

This is a vertical slide (nested under the previous one)

--

### Even Further

Another vertical slide in the same section

---

## Tables

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Tailwind | ✅ |
| TOC | ✅ |
| Animations | ✅ |

---

## Links & Images

Check out [Slidedown on GitHub](https://github.com/adubinsky/slidedown)

Images work too!

---

## Math & Special Content

Inline code: \`npm install slidedown\`

And more advanced features coming soon!

---

## Thank You!

**Slidedown v2** - Markdown presentations reimagined

Press **T** to see the Table of Contents
`;

export default function App() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if markdown is provided via URL parameter or will be loaded
    const urlParams = new URLSearchParams(window.location.search);
    const mdParam = urlParams.get('md');

    if (mdParam) {
      // In future, fetch markdown from URL
      // For now, use sample
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  return <Presentation markdown={markdown} />;
}
