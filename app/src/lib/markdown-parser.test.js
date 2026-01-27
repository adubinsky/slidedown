/**
 * Markdown Parser Tests
 *
 * Tests to verify all markdown elements are properly parsed and handled
 */

import { parseMarkdown, generateTOC, getNextSlide, getPreviousSlide } from './markdown-parser';

// Test data
const simpleMarkdown = `# Title Slide

First slide content

---

## Second Slide

Second slide content`;

const verticalMarkdown = `# Horizontal 1

Content

--

## Vertical 1.1

Nested content

--

## Vertical 1.2

More nested

---

# Horizontal 2

Second horizontal`;

const complexMarkdown = `# Title

Content with **bold** and *italic*

---

## Lists

- Item 1
- Item 2
  - Nested
  - More nested

---

## Code

\`\`\`javascript
const x = 1;
\`\`\`

---

## Tables

| A | B |
|---|---|
| 1 | 2 |

---

> Quote here

[Link](https://example.com)`;

// Tests
export function runTests() {
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  function test(name, fn) {
    try {
      fn();
      results.passed++;
      results.tests.push({ name, status: 'PASS' });
      console.log(`✅ ${name}`);
    } catch (error) {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', error: error.message });
      console.error(`❌ ${name}: ${error.message}`);
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  // Test 1: Basic parsing
  test('Parse simple markdown into slides', () => {
    const slides = parseMarkdown(simpleMarkdown);
    assert(slides.length === 2, `Expected 2 slides, got ${slides.length}`);
    assert(slides[0].content.includes('Title Slide'), 'First slide should have title');
    assert(slides[1].content.includes('Second Slide'), 'Second slide should have content');
  });

  // Test 2: Vertical slides
  test('Parse vertical slides correctly', () => {
    const slides = parseMarkdown(verticalMarkdown);
    assert(slides.length === 4, `Expected 4 slides, got ${slides.length}`);

    // Check first horizontal group
    assert(slides[0].horizontal === 0, 'First slide horizontal index');
    assert(slides[0].vertical === 0, 'First slide vertical index');

    // Check vertical children
    assert(slides[1].horizontal === 0, 'Second slide horizontal index');
    assert(slides[1].vertical === 1, 'Second slide should be vertical child');

    assert(slides[2].horizontal === 0, 'Third slide horizontal index');
    assert(slides[2].vertical === 2, 'Third slide should be vertical child');

    // Check second horizontal
    assert(slides[3].horizontal === 1, 'Fourth slide horizontal index');
    assert(slides[3].vertical === 0, 'Fourth slide vertical index');
  });

  // Test 3: Extract slide titles
  test('Extract slide titles from headings', () => {
    const slides = parseMarkdown(simpleMarkdown);
    assert(slides[0].title === 'Title Slide', `Expected "Title Slide", got "${slides[0].title}"`);
    assert(slides[1].title === 'Second Slide', `Expected "Second Slide", got "${slides[1].title}"`);
  });

  // Test 4: Generate TOC
  test('Generate table of contents', () => {
    const slides = parseMarkdown(verticalMarkdown);
    const toc = generateTOC(slides);

    assert(toc.length === 2, `Expected 2 TOC items, got ${toc.length}`);
    assert(toc[0].children.length === 2, 'First TOC item should have 2 children');
    assert(toc[1].children.length === 0, 'Second TOC item should have no children');
  });

  // Test 5: Navigation helpers
  test('Get next slide', () => {
    const slides = parseMarkdown(simpleMarkdown);
    const next = getNextSlide(slides, 0);
    assert(next !== null, 'Should have next slide');
    assert(next.id === slides[1].id, 'Next slide should be second slide');
  });

  test('Get previous slide', () => {
    const slides = parseMarkdown(simpleMarkdown);
    const prev = getPreviousSlide(slides, 1);
    assert(prev !== null, 'Should have previous slide');
    assert(prev.id === slides[0].id, 'Previous slide should be first slide');
  });

  test('Get next slide returns null at end', () => {
    const slides = parseMarkdown(simpleMarkdown);
    const next = getNextSlide(slides, slides.length - 1);
    assert(next === null, 'Should return null at end');
  });

  test('Get previous slide returns null at start', () => {
    const slides = parseMarkdown(simpleMarkdown);
    const prev = getPreviousSlide(slides, 0);
    assert(prev === null, 'Should return null at start');
  });

  // Test 6: Speaker notes
  test('Extract speaker notes', () => {
    const markdown = `# Slide

Content here

Note: This is a speaker note`;

    const slides = parseMarkdown(markdown);
    assert(slides[0].notes === 'This is a speaker note', 'Should extract speaker notes');
  });

  // Test 7: Empty content
  test('Handle empty slides', () => {
    const markdown = `# First

---

---

# Last`;

    const slides = parseMarkdown(markdown);
    assert(slides.length === 3, 'Should parse empty slides');
  });

  // Test 8: Complex markdown
  test('Handle complex markdown elements', () => {
    const slides = parseMarkdown(complexMarkdown);
    assert(slides.length === 5, `Expected 5 slides, got ${slides.length}`);

    // Check if content is preserved
    assert(slides[0].content.includes('**bold**'), 'Bold text preserved');
    assert(slides[0].content.includes('*italic*'), 'Italic text preserved');
    assert(slides[1].content.includes('- Item 1'), 'Lists preserved');
    assert(slides[2].content.includes('```javascript'), 'Code blocks preserved');
    assert(slides[3].content.includes('| A | B |'), 'Tables preserved');
    assert(slides[4].content.includes('> Quote'), 'Quotes preserved');
  });

  // Test 9: Slide IDs are unique
  test('Generate unique slide IDs', () => {
    const slides = parseMarkdown(verticalMarkdown);
    const ids = slides.map(s => s.id);
    const uniqueIds = new Set(ids);
    assert(ids.length === uniqueIds.size, 'All slide IDs should be unique');
  });

  // Test 10: Slide IDs are sequential
  test('Slide IDs are sequential', () => {
    const slides = parseMarkdown(simpleMarkdown);
    slides.forEach((slide, index) => {
      assert(slide.id === index, `Slide ${index} should have ID ${index}, got ${slide.id}`);
    });
  });

  // Test 11: Handle null/undefined input
  test('Handle null input gracefully', () => {
    const slides = parseMarkdown(null);
    assert(Array.isArray(slides), 'Should return array');
    assert(slides.length === 0, 'Should return empty array');
  });

  test('Handle undefined input gracefully', () => {
    const slides = parseMarkdown(undefined);
    assert(Array.isArray(slides), 'Should return array');
    assert(slides.length === 0, 'Should return empty array');
  });

  test('Handle empty string input', () => {
    const slides = parseMarkdown('');
    assert(Array.isArray(slides), 'Should return array');
    assert(slides.length === 0, 'Should return empty array');
  });

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Test Results: ${results.passed} passed, ${results.failed} failed`);
  console.log('='.repeat(50));

  return results;
}

// Auto-run tests if in test environment
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
  console.log('Running Markdown Parser Tests...\n');
  runTests();
}

export default { runTests, parseMarkdown, generateTOC };
