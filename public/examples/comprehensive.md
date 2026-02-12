# Slidedown v2 - Comprehensive Test

**Complete Markdown Feature Test**

---

## Typography Test

### All Heading Levels

# H1 Heading - Largest
## H2 Heading - Large
### H3 Heading - Medium
#### H4 Heading - Small
##### H5 Heading - Smaller
###### H6 Heading - Smallest

---

## Text Formatting

**Bold text** and *italic text* and ***bold italic***

Regular text with `inline code` styling

~~Strikethrough text~~ (if supported)

---

## Lists - Unordered

- First level item
- Another first level
  - Nested second level
  - More nested items
    - Third level nesting
    - Even deeper
- Back to first level

---

## Lists - Ordered

1. First item
2. Second item
3. Third item
   1. Nested numbering
   2. More nested
      1. Deep nesting
      2. Very deep
4. Back to top level

---

## Mixed Lists

1. Ordered item
   - Unordered nested
   - Another unordered
2. Second ordered
   1. Nested ordered
   - Mixed with unordered

---

## Links

[External link to GitHub](https://github.com/adubinsky/slidedown)

[Internal anchor](#typography-test)

https://auto-linked-url.com

---

## Images

![Placeholder Image](https://placehold.co/800x400/3b82f6/ffffff?text=Slidedown+v2)

*Caption text below image*

---

## Blockquotes

> This is a simple blockquote
>
> It can span multiple lines
> and contain **formatting**

> Nested quote
>> Double nested
>>> Triple nested

---

## Code - Inline

Use `const variable = 'value'` for inline code.

The `npm install` command installs packages.

---

## Code - JavaScript

```javascript
// JavaScript example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(`Fibonacci(10) = ${result}`);
```

---

## Code - Python

```python
# Python example
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))
```

---

## Code - No Language

```
Plain code block
No syntax highlighting
Just monospace font
  With indentation preserved
```

---

## Tables - Simple

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell A1  | Cell B1  | Cell C1  |
| Cell A2  | Cell B2  | Cell C2  |
| Cell A3  | Cell B3  | Cell C3  |

---

## Tables - Aligned

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
| More         | Content        | Here          |

---

## Tables - Complex

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| Markdown | ✅ | High | **Fully supported** |
| Tables | ✅ | High | *With styling* |
| Code | ✅ | High | Syntax highlighting |
| Images | ⚠️ | Medium | Testing needed |

---

## Horizontal Rules

Content above the line

---

Content below the line

---

## Task Lists

- [x] Completed task
- [x] Another done task
- [ ] Incomplete task
- [ ] TODO item
  - [x] Nested completed
  - [ ] Nested incomplete

---

## HTML in Markdown

<div style="color: #60a5fa; font-size: 2rem;">
  Custom HTML styling works!
</div>

<span style="background: #3b82f6; padding: 0.5rem; border-radius: 0.5rem;">
  Inline HTML with styles
</span>

---

## Emoji Support

😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃

🔥 💡 ⚡ ✨ 🎉 🎊 🎈 🎁 🏆 🥇

👍 👎 👏 🤝 💪 🙏 ✌️ 🤘 🤙 🤞

---

## Special Characters

© ® ™ § ¶ † ‡ • ‰ ′ ″

← ↑ → ↓ ↔ ↕ ⇐ ⇑ ⇒ ⇓

✓ ✗ ✘ ☐ ☑ ☒ ◯ ◉ ■ □

---

## Math Expressions

Inline math: $E = mc^2$

Block math:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

## Definition Lists

Term 1
: Definition of term 1
: Another definition

Term 2
: Definition of term 2

---

## Footnotes

Here's a sentence with a footnote[^1].

Here's another with a footnote[^2].

[^1]: This is the first footnote.
[^2]: This is the second footnote.

---

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: HyperText Markup Language
*[W3C]: World Wide Web Consortium

---

## Nested Elements

> **Quote with bold**
>
> - List in quote
> - Another item
>
> ```javascript
> // Code in quote
> const x = 1;
> ```

---

## Long Content Test

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

---

## Vertical Slides Test

This is the parent slide

--

### Vertical Child 1

First nested slide going down

--

### Vertical Child 2

Second nested slide

--

### Vertical Child 3

Third nested slide

---

## Multiple Vertical Groups

First horizontal slide with children

--

### Group 1 - Child 1

--

### Group 1 - Child 2

---

## Second Group

Second horizontal slide with children

--

### Group 2 - Child 1

--

### Group 2 - Child 2

---

## Mixed Content

# Large Title

**Important:** This slide combines *multiple* `markdown` elements.

- Lists
- Code: `const x = 1`
- [Links](https://example.com)

> And a quote for good measure

| Table | Also |
|-------|------|
| Included | Here |

---

## Speaker Notes Test

This slide has visible content

Note: This is a speaker note that should not appear on the slide itself. It's only visible in presenter mode. You can write multiple lines here.

---

## Custom HTML Attributes

<!-- .slide: data-background="#667eea" -->

## Colored Background

This slide should have a custom purple background

---

## Fragments Test

Content that appears incrementally:

- First point <!-- .element: class="fragment" -->
- Second point <!-- .element: class="fragment" -->
- Third point <!-- .element: class="fragment" -->

---

## Fragment Animations

- Fade in <!-- .element: class="fragment fade-in" -->
- Fade out <!-- .element: class="fragment fade-out" -->
- Fade up <!-- .element: class="fragment fade-up" -->
- Grow <!-- .element: class="fragment grow" -->
- Shrink <!-- .element: class="fragment shrink" -->

---

## Auto-Animate Test

<!-- .slide: data-auto-animate -->

### Moving Box

<div style="background: #60a5fa; padding: 2rem;">
  Box 1
</div>

---

<!-- .slide: data-auto-animate -->

### Moving Box

<div style="background: #60a5fa; padding: 2rem; margin-left: 200px;">
  Box 1 (moved)
</div>

---

## Transition Test

<!-- .slide: data-transition="fade" -->

### Fade Transition

This slide uses a fade transition

---

<!-- .slide: data-transition="slide" -->

### Slide Transition

This slide uses a slide transition

---

## Nested Markdown

1. First item
   > Quote inside list

   ```javascript
   // Code inside list
   const nested = true;
   ```

2. Second item with **bold** and *italic*

---

## Edge Cases

### Empty Elements

**Empty bold:**

*Empty italic:*

`Empty code:`

### Multiple Spaces

Word1     Word2     Word3

### Special Markdown

\*Not italic\* \**Not bold\**

\`Not code\`

---

## Performance Test

### Large List

1. Item 1
2. Item 2
3. Item 3
4. Item 4
5. Item 5
6. Item 6
7. Item 7
8. Item 8
9. Item 9
10. Item 10
11. Item 11
12. Item 12
13. Item 13
14. Item 14
15. Item 15
16. Item 16
17. Item 17
18. Item 18
19. Item 19
20. Item 20

---

## End of Test

# Thank You!

This presentation tests all major markdown features.

✅ Typography
✅ Lists
✅ Code
✅ Tables
✅ Images
✅ Blockquotes
✅ HTML
✅ Special features

---

## Final Slide

**Questions?**

[View Source](https://github.com/adubinsky/slidedown)
