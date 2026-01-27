import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Slide from './Slide';
import Navigation from './Navigation';
import TOC from './TOC';
import { parseMarkdown, getNextSlide, getPreviousSlide, generateTOC } from '../lib/markdown-parser';

export default function Presentation({ markdown }) {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [toc, setToc] = useState([]);

  // Parse markdown into slides
  useEffect(() => {
    if (markdown) {
      const parsedSlides = parseMarkdown(markdown);
      setSlides(parsedSlides);
      setToc(generateTOC(parsedSlides));
    }
  }, [markdown]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    const next = getNextSlide(slides, currentIndex);
    if (next) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  }, [slides, currentIndex]);

  // Navigate to previous slide
  const previousSlide = useCallback(() => {
    const prev = getPreviousSlide(slides, currentIndex);
    if (prev) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  }, [slides, currentIndex]);

  // Navigate to specific slide
  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      // Keep TOC open when navigating
    }
  }, [slides.length, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          previousSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case 'Escape':
          setShowTOC(false);
          break;
        case 't':
        case 'T':
          setShowTOC(!showTOC);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide, goToSlide, slides.length, showTOC]);

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">No Slides Found</h1>
          <p className="text-xl text-gray-400">
            Please provide markdown content to display.
          </p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className="flex h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Table of Contents - Left Side */}
      <TOC
        toc={toc}
        currentIndex={currentIndex}
        isOpen={showTOC}
        onSelectSlide={goToSlide}
      />

      {/* Main content area - Right Side */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Main slide area */}
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={currentSlide.id}
            content={currentSlide.content}
            isActive={true}
            direction={direction}
          />
        </AnimatePresence>

        {/* Navigation controls */}
        <Navigation
          currentIndex={currentIndex}
          totalSlides={slides.length}
          onNext={nextSlide}
          onPrevious={previousSlide}
          onToggleTOC={() => setShowTOC(!showTOC)}
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-6 bg-gray-800 bg-opacity-75 px-4 py-2 rounded text-sm z-20">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}
