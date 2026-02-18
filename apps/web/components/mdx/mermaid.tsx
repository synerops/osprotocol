'use client';

import { use, useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

// Direct hex color palette for Mermaid diagrams
// Minimalist aesthetic with subtle grays, low contrast
const MERMAID_THEMES = {
  light: {
    background: '#f7f7f7',
    primaryColor: '#f7f7f7', // Card/Muted - light gray for boxes
    primaryTextColor: '#1a1a1a',
    primaryBorderColor: '#e0e0e0',
    lineColor: '#d0d0d0',
    secondaryColor: '#ebebeb',
    tertiaryColor: '#f0f0f0',
    textColor: '#1a1a1a',
    border1: '#e0e0e0',
    border2: '#d5d5d5',
  },
  dark: {
    background: '#121212',
    primaryColor: '#121212', // Card/Muted - dark gray for boxes (NOT white!)
    primaryTextColor: '#e5e5e5',
    primaryBorderColor: '#404040',
    lineColor: '#404040',
    secondaryColor: '#353535',
    tertiaryColor: '#3a3a3a',
    textColor: '#e5e5e5',
    border1: '#404040',
    border2: '#4a4a4a',
  },
} as const;

// Get theme colors - simplified to return directly from palette
function getThemeColors(theme: string | undefined) {
  if (!theme) return MERMAID_THEMES.dark;
  return MERMAID_THEMES[theme as 'light' | 'dark'];
}

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <MermaidContent chart={chart} />;
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId();
  const { resolvedTheme, theme: themeValue } = useTheme();
  const { default: mermaid } = use(cachePromise('mermaid', () => import('mermaid')));

  // Zoom state and SVG dimensions
  const [zoom, setZoom] = useState(1);
  const [svgSize, setSvgSize] = useState<{ width: number; height: number } | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const zoomReset = () => setZoom(1);

  // State to force re-render when theme changes via CSS class
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  // Detect theme changes by watching for .dark class on HTML element
  // This handles both next-themes and fumadocs theme switching
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const detectedTheme = isDark ? 'dark' : 'light';
      
      setCurrentTheme((prevTheme) => {
        if (detectedTheme !== prevTheme) {
          return detectedTheme;
        }
        return prevTheme;
      });
    };

    // Check theme on mount
    checkTheme();

    // Watch for changes to the HTML class attribute
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      }
    });

    // Observe changes to the html element's class attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [resolvedTheme, themeValue]); // Removed currentTheme from deps to avoid infinite loop

  // Prefer resolvedTheme if available, otherwise use detected theme from HTML
  const theme = resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : currentTheme;
  const themeColors = getThemeColors(theme);

  // Cache key must include theme to invalidate when theme changes
  const cacheKey = `${chart}-${theme}`;

  // Clear cache entries for this chart when theme changes to force re-render
  useEffect(() => {
    // When theme changes, invalidate old cache entries for this chart
    const keysToDelete: string[] = [];
    cache.forEach((_, key) => {
      if (key.startsWith(`${chart}-`) && key !== cacheKey) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => cache.delete(key));
  }, [theme, chart, cacheKey]);

  // Render SVG with theme-specific colors
  // Initialize Mermaid INSIDE the render function to ensure correct theme colors
  const { svg, bindFunctions } = use(
    cachePromise(cacheKey, () => {
      // Initialize Mermaid with theme-specific colors BEFORE rendering
      // This ensures the SVG is rendered with correct colors for current theme
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        fontFamily: 'inherit',
        themeCSS: `
          margin: 1.5rem auto 0;
          /* Background for entire diagram */
          svg {
            background-color: ${themeColors.background} !important;
          }
          /* All node shapes - use specific selectors for SVG elements */
          .node rect,
          .node circle,
          .node ellipse,
          .node polygon,
          rect.node-bkg,
          polygon.node-bkg {
            fill: ${themeColors.primaryColor} !important;
            stroke: ${themeColors.primaryBorderColor} !important;
            stroke-width: 1.5px !important;
          }
          /* Diamond shapes (decision nodes) - must come after general polygon rule */
          .node polygon {
            fill: ${themeColors.secondaryColor} !important;
          }
          /* Rounded rectangles */
          .node rect[class*="rounded"] {
            fill: ${themeColors.tertiaryColor} !important;
          }
          /* Text in ALL nodes - CRITICAL for dark mode text color */
          .nodeLabel,
          .cluster-label,
          .nodeLabel text,
          .nodeLabel tspan,
          text.nodeLabel,
          .node text,
          .nodeLabel .node-label,
          g.node text,
          g.node tspan {
            fill: ${themeColors.textColor} !important;
            color: ${themeColors.textColor} !important;
          }
          /* Edge paths and arrows */
          .edgePath .path,
          path.edgePath,
          .flowchart-link {
            stroke: ${themeColors.lineColor} !important;
            stroke-width: 1.5px !important;
          }
          /* Arrow markers */
          .arrowheadPath,
          marker path,
          marker .arrowheadPath {
            fill: ${themeColors.lineColor} !important;
            stroke: ${themeColors.lineColor} !important;
          }
          /* Edge labels */
          .edgeLabel {
            background-color: ${themeColors.background} !important;
          }
          .edgeLabel text,
          .edgeLabel tspan {
            fill: ${themeColors.textColor} !important;
            color: ${themeColors.textColor} !important;
          }
          /* Ensure all SVG text elements use correct color (but not arrow labels) */
          svg .node text,
          svg .node tspan,
          svg .cluster text,
          svg .cluster tspan,
          svg .nodeLabel,
          svg text.nodeLabel {
            fill: ${themeColors.textColor} !important;
          }
        `,
        theme: 'base', // Use base theme as foundation (minimal)
        themeVariables: {
          // Background
          background: themeColors.background,
          mainBkgColor: themeColors.primaryColor,
          secondBkgColor: themeColors.secondaryColor,
          tertiaryBkgColor: themeColors.tertiaryColor,
          // Text
          textColor: themeColors.textColor,
          primaryTextColor: themeColors.primaryTextColor,
          // Primary colors (subtle, not saturated)
          primaryColor: themeColors.primaryColor,
          primaryBorderColor: themeColors.primaryBorderColor,
          // Secondary
          secondaryColor: themeColors.secondaryColor,
          tertiaryColor: themeColors.tertiaryColor,
          // Borders and lines
          border1: themeColors.border1,
          border2: themeColors.border2,
          lineColor: themeColors.lineColor,
          defaultLinkColor: themeColors.lineColor,
          // Flowchart specific - use subtle palette
          cScale0: themeColors.primaryColor,
          cScale1: themeColors.secondaryColor,
          cScale2: themeColors.tertiaryColor,
          // Additional node types
          noteBkgColor: themeColors.primaryColor,
          noteTextColor: themeColors.textColor,
          noteBorderColor: themeColors.primaryBorderColor,
          actorBorder: themeColors.primaryBorderColor,
          actorBkg: themeColors.primaryColor,
          actorTextColor: themeColors.textColor,
          actorLineColor: themeColors.lineColor,
          labelBoxBkgColor: themeColors.primaryColor,
          labelBoxBorderColor: themeColors.primaryBorderColor,
          labelTextColor: themeColors.textColor,
          loopTextColor: themeColors.textColor,
          activationBorderColor: themeColors.primaryBorderColor,
          activationBkgColor: themeColors.secondaryColor,
          sequenceNumberColor: themeColors.textColor,
          sectionBkgColor: themeColors.primaryColor,
          altBkgColor: themeColors.secondaryColor,
          clusterBkg: themeColors.primaryColor,
          clusterBorder: themeColors.primaryBorderColor,
          titleColor: themeColors.textColor,
          edgeLabelBackground: themeColors.background,
        },
      });

      // Render with current theme colors (initialized above)
      return mermaid.render(id, chart.replaceAll('\\n', '\n'));
    }),
  );

  // Measure SVG dimensions after render (must be after svg is defined)
  useEffect(() => {
    if (diagramRef.current) {
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        const rect = svgElement.getBoundingClientRect();
        setSvgSize({ width: rect.width, height: rect.height });
      }
    }
  }, [svg]);

  return (
    <div className="mermaid-container group relative">
      {/* Zoom controls */}
      <div
        className="absolute right-2 top-2 z-10 flex gap-1 rounded-md border border-neutral-200 bg-white/90 p-0.5 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900/90"
        style={{ opacity: zoom !== 1 ? 1 : undefined }}
      >
        <button
          onClick={zoomOut}
          className="flex h-6 w-6 items-center justify-center rounded text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          title="Zoom out"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={zoomReset}
          className="flex h-6 min-w-[2rem] items-center justify-center rounded px-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          title="Reset zoom"
          aria-label="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={zoomIn}
          className="flex h-6 w-6 items-center justify-center rounded text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          title="Zoom in"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>

      {/* Scrollable container for zoomed diagram */}
      <div
        className="overflow-auto"
        style={{
          maxHeight: zoom > 1 ? '70vh' : undefined,
        }}
      >
        {/* Wrapper sized to scaled dimensions for proper scrolling */}
        <div
          style={
            svgSize && zoom !== 1
              ? {
                  width: svgSize.width * zoom,
                  height: svgSize.height * zoom,
                }
              : undefined
          }
        >
          <div
            ref={(container) => {
              diagramRef.current = container;
              if (container) bindFunctions?.(container);
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
            className="mermaid-diagram"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
    </div>
  );
}
