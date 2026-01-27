import { motion, AnimatePresence } from 'framer-motion';

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: -320,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function TOC({ toc, currentIndex, isOpen, onClose, onSelectSlide }) {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className="absolute left-0 top-0 bottom-0 w-80 bg-gray-900 shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Table of Contents</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              aria-label="Close table of contents"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* TOC Items */}
          <nav>
            {toc.map((item, index) => (
              <div key={item.id} className="mb-2">
                {/* Main slide */}
                <button
                  onClick={() => onSelectSlide(item.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    currentIndex === item.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="text-xs font-mono mr-2 mt-1 opacity-50">
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate">{item.title}</span>
                  </div>
                </button>

                {/* Vertical slides (nested) */}
                {item.children.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <button
                        key={child.id}
                        onClick={() => onSelectSlide(child.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          currentIndex === child.id
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-800 text-gray-400'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="text-xs font-mono mr-2 opacity-50">
                            {index + 1}.{childIndex + 1}
                          </span>
                          <span className="flex-1 truncate">{child.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
            <div>Total slides: {toc.length}</div>
            <div className="mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">ESC</kbd> or{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">T</kbd> to close
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
