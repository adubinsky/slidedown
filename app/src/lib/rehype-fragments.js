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

    // First pass: find all fragment comments and mark the next element
    visit(tree, (node, index, parent) => {
      if (!parent || index === null) return;

      // Check if this is a fragment comment
      if (node.type === 'comment' && node.value) {
        const commentValue = node.value.trim();
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

          // The comment is typically the last child of the element we want to animate
          // So apply the fragment classes to the PARENT element
          if (parent.type === 'element') {
            nodesToProcess.push({
              node: parent,
              animationType,
              fragmentIndex: fragmentIndexAttr ? parseInt(fragmentIndexAttr) : nodesToProcess.length,
            });
          }
        }
      }

      // Also check for inline fragments (spans with fragment classes)
      if (node.type === 'element' && node.tagName === 'span' && node.properties?.className) {
        const classes = Array.isArray(node.properties.className)
          ? node.properties.className
          : [node.properties.className];

        if (classes.some(c => c.includes('fragment'))) {
          let animationType = 'fade-in';
          const fragmentClass = classes.find(c => c.startsWith('fragment-'));
          if (fragmentClass) {
            animationType = fragmentClass.replace('fragment-', '');
          }

          nodesToProcess.push({
            node,
            animationType,
            fragmentIndex: nodesToProcess.length,
          });
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
