import { motion } from 'framer-motion';

export default function TOC({ toc, currentIndex, isOpen, onSelectSlide }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 320 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-gray-900 border-r border-gray-800 overflow-hidden flex-shrink-0"
    >
      <div className="w-80 h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">Table of Contents</h2>
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
            Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">T</kbd> to toggle
          </div>
        </div>
      </div>
    </motion.div>
  );
}
