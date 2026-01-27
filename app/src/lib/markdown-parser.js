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
        const { content, notes, title } = extractSlideMetadata(vSlide.trim());
        return {
          id: slideId++,
          content,
          notes,
          title,
          horizontal: hIndex,
          vertical: vIndex,
        };
      });
      slides.push(...verticalGroup);
    } else {
      // Single slide (no verticals)
      const { content, notes, title } = extractSlideMetadata(hSlide.trim());
      slides.push({
        id: slideId++,
        content,
        notes,
        title,
        horizontal: hIndex,
        vertical: 0,
      });
    }
  });

  return slides;
}

/**
 * Extract slide metadata (title, speaker notes)
 */
function extractSlideMetadata(content) {
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

  return { content, notes, title };
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
