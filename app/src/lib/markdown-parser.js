/**
 * Parse markdown content into slides
 * Supports both horizontal (---) and vertical (--) separators
 */
export function parseMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

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
 * Extract slide attributes from HTML comments
 * Example: <!-- .slide: data-background="#667eea" data-transition="fade" -->
 */
function extractSlideAttributes(content) {
  const attributes = {};
  const attrRegex = /<!--\s*\.slide:\s*([^>]+)\s*-->/;
  const match = content.match(attrRegex);

  if (!match) return attributes;

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

  return attributes;
}

/**
 * Extract fragments from content
 * Example: - Item <!-- .element: class="fragment fade-in" -->
 */
function extractFragments(content) {
  const fragments = [];
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
