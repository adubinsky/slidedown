/**
 * Rehype plugin to handle fragment animations
 * Processes HTML comments like <!-- .element: class="fragment fade-in" -->
 * and wraps the following element with appropriate fragment classes
 */
import { visit } from 'unist-util-visit';

export default function rehypeFragments(options = {}) {
  const currentFragmentIndex = options.currentFragmentIndex ?? -1;

  return (tree) => {
    const nodesToProcess = [];

    // First pass: find all HTML comments with .element: class="fragment..."
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === null) return;

      // Check if previous sibling is a fragment comment
      if (index > 0) {
        const prevNode = parent.children[index - 1];

        // Check for HTML comment nodes
        if (prevNode && prevNode.type === 'comment' && prevNode.value) {
          const commentValue = prevNode.value.trim();

          // Match <!-- .element: class="fragment ..." data-fragment-index="N" -->
          const fragmentMatch = commentValue.match(/\.element:\s*class="fragment([^"]*)"\s*(?:data-fragment-index="(\d+)")?/);

          if (fragmentMatch) {
            const classes = fragmentMatch[1].trim();
            const fragmentIndexAttr = fragmentMatch[2];

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

            nodesToProcess.push({
              node,
              index,
              parent,
              animationType,
              fragmentIndex: fragmentIndexAttr ? parseInt(fragmentIndexAttr) : nodesToProcess.length,
            });
          }
        }
      }
    });

    // Second pass: wrap identified nodes with fragment wrapper
    nodesToProcess.forEach(({ node, animationType, fragmentIndex }) => {
      // Determine if this fragment should be visible
      const isVisible = fragmentIndex <= currentFragmentIndex;

      // Add fragment classes to the node
      const existingClass = node.properties?.className || [];
      const classArray = Array.isArray(existingClass) ? existingClass : [existingClass];

      node.properties = node.properties || {};
      node.properties.className = [
        ...classArray,
        'fragment',
        `fragment-${animationType}`,
        `fragment-index-${fragmentIndex}`,
        isVisible ? 'fragment-visible' : 'fragment-hidden',
      ];

      // Add data attributes
      node.properties['data-fragment-index'] = fragmentIndex;
      node.properties['data-fragment-type'] = animationType;
    });
  };
}
