/**
 * Slidedown Style Guide
 *
 * This file defines the visual design system for all slide presentations.
 * Ensures consistent, professional appearance across all content.
 */

export const slideTheme = {
  // Typography scale
  typography: {
    h1: {
      fontSize: '4rem',        // 64px
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '2rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3rem',        // 48px
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '1.5rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',     // 36px
      fontWeight: '600',
      lineHeight: '1.3',
      marginBottom: '1.25rem',
    },
    h4: {
      fontSize: '1.875rem',    // 30px
      fontWeight: '600',
      lineHeight: '1.4',
      marginBottom: '1rem',
    },
    h5: {
      fontSize: '1.5rem',      // 24px
      fontWeight: '600',
      lineHeight: '1.4',
      marginBottom: '0.75rem',
    },
    h6: {
      fontSize: '1.25rem',     // 20px
      fontWeight: '600',
      lineHeight: '1.4',
      marginBottom: '0.5rem',
    },
    body: {
      fontSize: '1.5rem',      // 24px
      lineHeight: '1.6',
      marginBottom: '1rem',
    },
    bodySmall: {
      fontSize: '1.25rem',     // 20px
      lineHeight: '1.5',
    },
  },

  // Color palette
  colors: {
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
      muted: '#9ca3af',
      accent: '#60a5fa',
    },
    background: {
      primary: '#111827',
      secondary: '#1f2937',
      accent: '#3b82f6',
      gradient: ['#111827', '#1e293b'],
    },
    code: {
      background: '#1e293b',
      text: '#e5e7eb',
      highlight: '#2563eb',
    },
    border: {
      default: '#374151',
      accent: '#3b82f6',
    },
  },

  // Spacing scale (in rem)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
  },

  // Layout constraints
  layout: {
    maxWidth: '80rem',        // 1280px
    contentMaxWidth: '60rem', // 960px
    padding: {
      slide: '4rem',          // 64px
      content: '2rem',        // 32px
    },
  },

  // Animation timing
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// Layout configurations for different slide types
export const slideLayouts = {
  // Default: Centered content
  default: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: slideTheme.layout.padding.slide,
  },

  // Title slide: Large centered text
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: slideTheme.layout.padding.slide,
    minHeight: '100%',
  },

  // Content slide: Left-aligned with max width
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: slideTheme.layout.padding.slide,
    maxWidth: slideTheme.layout.contentMaxWidth,
    margin: '0 auto',
  },

  // Two columns
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: slideTheme.spacing.xl,
    alignItems: 'center',
    padding: slideTheme.layout.padding.slide,
  },

  // Image focus: Minimal text, large image
  imageFocus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: slideTheme.spacing.lg,
  },

  // Code focus: Optimized for code blocks
  code: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: slideTheme.spacing.lg,
  },
};

// Markdown element styles
export const markdownStyles = {
  // Headings
  h1: `
    font-size: ${slideTheme.typography.h1.fontSize};
    font-weight: ${slideTheme.typography.h1.fontWeight};
    line-height: ${slideTheme.typography.h1.lineHeight};
    margin-bottom: ${slideTheme.typography.h1.marginBottom};
    letter-spacing: ${slideTheme.typography.h1.letterSpacing};
    color: ${slideTheme.colors.text.primary};
  `,
  h2: `
    font-size: ${slideTheme.typography.h2.fontSize};
    font-weight: ${slideTheme.typography.h2.fontWeight};
    line-height: ${slideTheme.typography.h2.lineHeight};
    margin-bottom: ${slideTheme.typography.h2.marginBottom};
    letter-spacing: ${slideTheme.typography.h2.letterSpacing};
    color: ${slideTheme.colors.text.primary};
  `,
  // ... etc
};

export default slideTheme;
