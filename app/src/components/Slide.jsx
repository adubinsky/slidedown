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

  // Build background styles from slide attributes
  const bgStyle = {};

  if (attributes.backgroundColor) {
    bgStyle.backgroundColor = attributes.backgroundColor;
  } else if (attributes.background) {
    // Check if it's a color (starts with #) or an image URL
    if (attributes.background.startsWith('#')) {
      bgStyle.backgroundColor = attributes.background;
    } else if (attributes.background.startsWith('http') || attributes.background.startsWith('/')) {
      bgStyle.backgroundImage = `url(${attributes.background})`;
      bgStyle.backgroundSize = attributes.backgroundSize || 'cover';
      bgStyle.backgroundPosition = attributes.backgroundPosition || 'center';
      bgStyle.backgroundRepeat = 'no-repeat';
    }
  }

  if (attributes.backgroundOpacity !== undefined) {
    bgStyle.opacity = attributes.backgroundOpacity;
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
      <div className="min-h-full flex items-center justify-center p-16">
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
