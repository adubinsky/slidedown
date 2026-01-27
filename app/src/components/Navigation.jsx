export default function Navigation({ currentIndex, totalSlides, onNext, onPrevious, onToggleTOC }) {
  return (
    <>
      {/* Navigation arrows */}
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 disabled:opacity-25 disabled:cursor-not-allowed p-4 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={currentIndex === totalSlides - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 disabled:opacity-25 disabled:cursor-not-allowed p-4 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* TOC toggle button */}
      <button
        onClick={onToggleTOC}
        className="absolute top-4 left-4 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full transition-all"
        aria-label="Toggle table of contents"
        title="Press 'T' to toggle"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Keyboard shortcuts hint */}
      <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 px-3 py-2 rounded text-xs opacity-50 hover:opacity-100 transition-opacity">
        <div className="font-mono">
          <span className="inline-block w-16">↑ ↓</span> Navigate
        </div>
        <div className="font-mono">
          <span className="inline-block w-16">Space</span> Next
        </div>
        <div className="font-mono">
          <span className="inline-block w-16">T</span> TOC
        </div>
      </div>
    </>
  );
}
