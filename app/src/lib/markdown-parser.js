/**
 * Pre-process markdown to convert new symbol syntax to HTML comments
 * Converts:
 *   - ^^^ -> fade-up
 *   - vvv -> fade-down
 *   - ---> -> fade-right
 *   - <--- -> fade-left
 *   - +++ -> grow
 *   - ... -> shrink
 *   - ~~~ -> strike
 *   - >>red -> highlight-red
 *   - >>green -> highlight-green
 *   - >>blue -> highlight-blue
 *   - >> -> basic fragment
 */
function preprocessNewSyntax(markdown) {
  // Process block-level fragments (prefix markers)
  // Match patterns like "- ^^^ Item" or "^^^ Item"
  const blockPatterns = [
    { regex: /^(\s*[-*+]\s+)\^\^\^\s+(.+)$/gm, type: 'fade-up' },
    { regex: /^(\s*[-*+]\s+)vvv\s+(.+)$/gm, type: 'fade-down' },
    { regex: /^(\s*[-*+]\s+)--->\s+(.+)$/gm, type: 'fade-right' },
    { regex: /^(\s*[-*+]\s+)<---\s+(.+)$/gm, type: 'fade-left' },
    { regex: /^(\s*[-*+]\s+)\+\+\+\s+(.+)$/gm, type: 'grow' },
    { regex: /^(\s*[-*+]\s+)\.\.\.\s+(.+)$/gm, type: 'shrink' },
    { regex: /^(\s*[-*+]\s+)~~~\s+(.+)$/gm, type: 'strike' },
    { regex: /^(\s*[-*+]\s+)>>red\s+(.+)$/gm, type: 'highlight-red' },
    { regex: /^(\s*[-*+]\s+)>>green\s+(.+)$/gm, type: 'highlight-green' },
    { regex: /^(\s*[-*+]\s+)>>blue\s+(.+)$/gm, type: 'highlight-blue' },
    { regex: /^(\s*[-*+]\s+)>>\s+(.+)$/gm, type: 'fade-in' },
  ];

  blockPatterns.forEach(({ regex, type }) => {
    markdown = markdown.replace(regex, (match, prefix, content) => {
      return `${prefix}${content} <!-- .element: class="fragment ${type}" -->`;
    });
  });

  // Process inline fragments (surrounding markers)
  // Match patterns like "^^^text^^^" or "+++grows+++"
  const inlinePatterns = [
    { regex: /\^\^\^([^^\n]+)\^\^\^/g, type: 'fade-up' },
    { regex: /vvv([^v\n]+)vvv/g, type: 'fade-down' },
    { regex: /\+\+\+([^+\n]+)\+\+\+/g, type: 'grow' },
    { regex: /\.\.\.([^.\n]+)\.\.\./g, type: 'shrink' },
    { regex: /~~~([^~\n]+)~~~/g, type: 'strike' },
  ];

  inlinePatterns.forEach(({ regex, type }) => {
    markdown = markdown.replace(regex, (match, content) => {
      return `<span class="fragment fragment-${type}">${content}</span>`;
    });
  });

  // Process inline highlights with special markdown-style syntax
  // **>>red**text**>>** -> <span class="fragment fragment-highlight-red">text</span>
  markdown = markdown.replace(/\*\*>>red\*\*([^*]+)\*\*>>\*\*/g, '<span class="fragment fragment-highlight-red">$1</span>');
  markdown = markdown.replace(/\*\*>>green\*\*([^*]+)\*\*>>\*\*/g, '<span class="fragment fragment-highlight-green">$1</span>');
  markdown = markdown.replace(/\*\*>>blue\*\*([^*]+)\*\*>>\*\*/g, '<span class="fragment fragment-highlight-blue">$1</span>');

  return markdown;
}

/**
 * Parse markdown content into slides
 * Supports both horizontal (---) and vertical (--) separators
 */
export function parseMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

  // Pre-process to convert new syntax to internal format
  markdown = preprocessNewSyntax(markdown);

  // Split by horizontal separator (---)
  const horizontalSlides = markdown.split(/\r?\n---\r?\n/);

  const slides = [];
  let slideId = 0;

  horizontalSlides.forEach((hSlide, hIndex) => {
    // Check if this horizontal slide has vertical slides (--)
    const verticalSlides = hSlide.split(/\r?\n--\r?\n/);

    if (verticalSlides.length > 1) {
      // Has vertical slides
      const verticalGroup = verticalSlides.map((vSlide, vIndex) => {
        const { content, notes, title, attributes, fragments } = extractSlideMetadata(vSlide.trim());
        return {
          id: slideId++,
          content,
          notes,
          title,
          attributes,
          fragments,
          currentFragmentIndex: -1,
          horizontal: hIndex,
          vertical: vIndex,
        };
      });
      slides.push(...verticalGroup);
    } else {
      // Single slide (no verticals)
      const { content, notes, title, attributes, fragments } = extractSlideMetadata(hSlide.trim());
      slides.push({
        id: slideId++,
        content,
        notes,
        title,
        attributes,
        fragments,
        currentFragmentIndex: -1,
        horizontal: hIndex,
        vertical: 0,
      });
    }
  });

  return slides;
}

/**
 * Extract slide metadata (title, speaker notes, attributes, fragments)
 */
function extractSlideMetadata(content) {
  // Extract slide attributes (<!-- .slide: data-background="#667eea" -->)
  const attributes = extractSlideAttributes(content);

  // Use cleaned content if available (with ::: directives removed)
  if (attributes._cleanedContent) {
    content = attributes._cleanedContent;
    delete attributes._cleanedContent; // Remove from attributes object
  }

  // Extract fragments (<!-- .element: class="fragment" -->)
  const fragments = extractFragments(content);

  // Extract speaker notes (Note: ...)
  let notes = '';
  const noteMatch = content.match(/\nNote:\s*(.+?)(?=\n#|\n---|$)/s);
  if (noteMatch) {
    notes = noteMatch[1].trim();
    content = content.replace(/\nNote:\s*.+?(?=\n#|\n---|$)/s, '');
  }

  // Extract title (first heading)
  let title = '';
  const titleMatch = content.match(/^#+ (.+)/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  return { content, notes, title, attributes, fragments };
}

/**
 * Extract slide attributes from both HTML comments and new ::: syntax
 * HTML: <!-- .slide: data-background="#667eea" data-transition="fade" -->
 * New: ::: #667eea
 *      ::: https://example.com/image.jpg
 *      ::: opacity:0.3
 */
function extractSlideAttributes(content) {
  const attributes = {};

  // Check for new ::: syntax first - use regex to find and remove
  const directiveRegex = /^:::(.+)$/gm;
  let match;
  const directivesToRemove = [];

  while ((match = directiveRegex.exec(content)) !== null) {
    const value = match[1].trim();
    directivesToRemove.push(match[0]); // Store the full match to remove later

    // Parse opacity
    if (value.startsWith('opacity:')) {
      attributes.backgroundOpacity = parseFloat(value.substring(8));
    }
    // Parse color (starts with # or is a CSS color)
    else if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
      attributes.background = value;
    }
    // Parse gradient
    else if (value.includes('gradient')) {
      attributes.background = value;
    }
    // Parse URL (image)
    else if (value.startsWith('http') || value.startsWith('/') || value.startsWith('.')) {
      attributes.background = value;
    }
  }

  // Remove all ::: directives from content
  let cleanedContent = content;
  if (directivesToRemove.length > 0) {
    // Remove ::: lines (and their surrounding newlines)
    cleanedContent = content.replace(/^:::.*$\n?/gm, '');
  }

  // Store cleaned content for return
  if (directivesToRemove.length > 0) {
    attributes._cleanedContent = cleanedContent;
  }

  // Also check for old HTML comment syntax for backwards compatibility
  const attrRegex = /<!--\s*\.slide:\s*([^>]+)\s*-->/;
  match = content.match(attrRegex);

  if (match) {
    const attrString = match[1];

    // Parse data-background (color or image URL)
    const bgMatch = attrString.match(/data-background="([^"]+)"/);
    if (bgMatch) {
      attributes.background = bgMatch[1];
    }

    // Parse data-background-color
    const bgColorMatch = attrString.match(/data-background-color="([^"]+)"/);
    if (bgColorMatch) {
      attributes.backgroundColor = bgColorMatch[1];
    }

    // Parse data-background-image
    const bgImageMatch = attrString.match(/data-background-image="([^"]+)"/);
    if (bgImageMatch) {
      attributes.background = bgImageMatch[1];
    }

    // Parse data-background-size
    const bgSizeMatch = attrString.match(/data-background-size="([^"]+)"/);
    if (bgSizeMatch) {
      attributes.backgroundSize = bgSizeMatch[1];
    }

    // Parse data-background-position
    const bgPosMatch = attrString.match(/data-background-position="([^"]+)"/);
    if (bgPosMatch) {
      attributes.backgroundPosition = bgPosMatch[1];
    }

    // Parse data-background-opacity
    const bgOpacityMatch = attrString.match(/data-background-opacity="([^"]+)"/);
    if (bgOpacityMatch) {
      attributes.backgroundOpacity = parseFloat(bgOpacityMatch[1]);
    }

    // Parse data-transition
    const transitionMatch = attrString.match(/data-transition="([^"]+)"/);
    if (transitionMatch) {
      attributes.transition = transitionMatch[1];
    }

    // Parse data-auto-animate
    if (attrString.includes('data-auto-animate')) {
      attributes.autoAnimate = true;
    }
  }

  return attributes;
}

/**
 * Extract fragments from content
 * Example: - Item <!-- .element: class="fragment fade-in" -->
 * Also detects inline spans: <span class="fragment fragment-grow">text</span>
 */
function extractFragments(content) {
  const fragments = [];

  // Extract HTML comment fragments
  const fragmentRegex = /<!--\s*\.element:\s*class="fragment([^"]*)"\s*(?:data-fragment-index="(\d+)")?\s*-->/g;

  let match;
  let index = 0;
  while ((match = fragmentRegex.exec(content)) !== null) {
    const classes = match[1].trim();
    const fragmentIndex = match[2] ? parseInt(match[2]) : index;

    // Parse animation type from classes
    let animationType = 'fade-in'; // default
    if (classes.includes('fade-out')) animationType = 'fade-out';
    else if (classes.includes('fade-up')) animationType = 'fade-up';
    else if (classes.includes('fade-down')) animationType = 'fade-down';
    else if (classes.includes('fade-left')) animationType = 'fade-left';
    else if (classes.includes('fade-right')) animationType = 'fade-right';
    else if (classes.includes('grow')) animationType = 'grow';
    else if (classes.includes('shrink')) animationType = 'shrink';
    else if (classes.includes('strike')) animationType = 'strike';
    else if (classes.includes('highlight-red')) animationType = 'highlight-red';
    else if (classes.includes('highlight-blue')) animationType = 'highlight-blue';
    else if (classes.includes('highlight-green')) animationType = 'highlight-green';

    fragments.push({
      index: fragmentIndex,
      type: animationType,
      position: match.index,
    });

    index++;
  }

  // Extract inline span fragments
  const spanRegex = /<span class="fragment fragment-([^"]+)">([^<]+)<\/span>/g;
  while ((match = spanRegex.exec(content)) !== null) {
    const animationType = match[1];

    fragments.push({
      index: index,
      type: animationType,
      position: match.index,
    });

    index++;
  }

  // Sort fragments by index
  fragments.sort((a, b) => a.index - b.index);

  return fragments;
}

/**
 * Get flat index from horizontal/vertical position
 */
export function getFlatIndex(slides, horizontal, vertical) {
  return slides.findIndex(
    (s) => s.horizontal === horizontal && s.vertical === vertical
  );
}

/**
 * Get next slide coordinates
 */
export function getNextSlide(slides, currentIndex) {
  if (currentIndex >= slides.length - 1) return null;
  return slides[currentIndex + 1];
}

/**
 * Get previous slide coordinates
 */
export function getPreviousSlide(slides, currentIndex) {
  if (currentIndex <= 0) return null;
  return slides[currentIndex - 1];
}

/**
 * Check if slide has vertical slides below it
 */
export function hasVerticalSlides(slides, horizontal) {
  const slidesAtH = slides.filter((s) => s.horizontal === horizontal);
  return slidesAtH.length > 1;
}

/**
 * Get vertical slide at same horizontal position
 */
export function getVerticalSlide(slides, horizontal, vertical, direction) {
  const targetVertical = direction === 'down' ? vertical + 1 : vertical - 1;
  return slides.find(
    (s) => s.horizontal === horizontal && s.vertical === targetVertical
  );
}

/**
 * Generate table of contents from slides
 */
export function generateTOC(slides) {
  const toc = [];
  let currentHorizontal = -1;

  slides.forEach((slide) => {
    if (slide.horizontal !== currentHorizontal) {
      currentHorizontal = slide.horizontal;
      toc.push({
        id: slide.id,
        title: slide.title || `Slide ${slide.horizontal + 1}`,
        horizontal: slide.horizontal,
        children: [],
      });
    }

    // Add vertical slides as children
    if (slide.vertical > 0) {
      const parent = toc[toc.length - 1];
      parent.children.push({
        id: slide.id,
        title: slide.title || `Slide ${slide.horizontal + 1}.${slide.vertical + 1}`,
        horizontal: slide.horizontal,
        vertical: slide.vertical,
      });
    }
  });

  return toc;
}
