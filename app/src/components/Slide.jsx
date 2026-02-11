import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDeflist from 'remark-deflist';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeFragments from '../lib/rehype-fragments';
import 'highlight.js/styles/monokai.css';
import 'katex/dist/katex.min.css';

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    y: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Slide({ content, isActive, direction = 0, attributes = {}, fragments = [], currentFragmentIndex = -1 }) {
  if (!isActive) return null;

  // Build background styles - separate layer for images with opacity
  const bgStyle = {};
  const bgImageStyle = {};
  let hasBackgroundImage = false;

  if (attributes.backgroundColor) {
    bgStyle.backgroundColor = attributes.backgroundColor;
  } else if (attributes.background) {
    // Check if it's a color (starts with #) or an image URL
    if (attributes.background.startsWith('#')) {
      bgStyle.backgroundColor = attributes.background;
    } else if (attributes.background.startsWith('http') || attributes.background.startsWith('/')) {
      // Use separate layer for images (to support opacity)
      hasBackgroundImage = true;
      const imageUrl = attributes.background;
      bgImageStyle.backgroundImage = `url(${imageUrl})`;
      bgImageStyle.backgroundSize = attributes.backgroundSize || 'cover';
      bgImageStyle.backgroundPosition = attributes.backgroundPosition || 'center';
      bgImageStyle.backgroundRepeat = 'no-repeat';
      bgImageStyle.opacity = attributes.backgroundOpacity ?? 1;
    } else if (attributes.background.includes('gradient')) {
      bgStyle.background = attributes.background;
    }
  }

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        y: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      className="absolute inset-0 overflow-auto"
      style={bgStyle}
    >
      {/* Background image layer with opacity support */}
      {hasBackgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={bgImageStyle}
        />
      )}

      <div className="min-h-full flex items-center justify-center p-16 relative z-10">
        <div className="slide-content max-w-5xl w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkDeflist]}
            rehypePlugins={[
              rehypeHighlight,
              rehypeRaw,
              rehypeKatex,
              [rehypeFragments, { currentFragmentIndex }],
            ]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
