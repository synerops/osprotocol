/**
 * Screenshot
 *
 * @experimental No real implementation yet.
 *
 * Visual capture and verification for agent output.
 * The checks-phase interface for taking screenshots
 * and comparing them against baselines for visual
 * regression detection
 * (Playwright, Puppeteer, Browserbase, ScreenshotOne).
 */

/**
 * Image format for screenshots
 *
 * Universal across all providers. PNG for lossless
 * (best for diff), JPEG/WebP for smaller payloads.
 */
export type ImageFormat = 'png' | 'jpeg' | 'webp'

/**
 * Screenshot capture options
 *
 * Convergent surface across Playwright, Puppeteer,
 * Browserbase (CDP), and ScreenshotOne.
 */
export interface ScreenshotOptions {
  /** Target URL (required for SaaS providers, optional for browser SDKs) */
  url?: string
  /** Capture the full scrollable page instead of just the viewport */
  fullPage?: boolean
  /** Clip to a specific region */
  clip?: {
    x: number
    y: number
    width: number
    height: number
  }
  /** CSS selector to capture a specific element */
  selector?: string
  /** Image format */
  format?: ImageFormat
  /** Quality (0-100). Ignored for PNG. */
  quality?: number
  /** DPI multiplier (e.g. 2 for retina) */
  scale?: number
  /** Transparent background (PNG/WebP only) */
  omitBackground?: boolean
  /** Extensible metadata for provider-specific options */
  metadata?: Record<string, unknown>
}

/**
 * A captured screenshot
 */
export interface ScreenshotEntry {
  /** Unique identifier */
  id: string
  /** Base64-encoded image data */
  data: string
  /** Image format */
  format: ImageFormat
  /** Image width in pixels */
  width: number
  /** Image height in pixels */
  height: number
  /** When this screenshot was taken (Unix ms) */
  createdAt: number
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Visual comparison result
 *
 * Produced by comparing two screenshots. Connects
 * to the checks pattern — passed/message like RuleResult.
 */
export interface ComparisonResult {
  /** Whether the screenshots match within threshold */
  passed: boolean
  /** Human-readable explanation */
  message: string
  /** Number of pixels that differ */
  diffPixels: number
  /** Ratio of different pixels (0-1) */
  diffRatio: number
  /** Base64-encoded diff image showing differences */
  diffImage?: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Visual verification interface
 *
 * Provides screenshot capture and baseline comparison
 * for visual regression detection. Capture is the means;
 * comparison result feeds into audit.ts alongside
 * RuleResult and JudgeResult.
 *
 * Only Playwright has built-in diff (toHaveScreenshot
 * via Pixelmatch). Other providers require external
 * comparison — the provider adapter handles this.
 */
export interface Screenshot {
  /**
   * Capture a screenshot
   *
   * Maps to:
   * - Playwright: page.screenshot(options)
   * - Puppeteer: page.screenshot(options)
   * - Browserbase: CDP Page.captureScreenshot
   * - ScreenshotOne: GET /take?url=...
   *
   * @param options - Capture options
   * @returns The captured screenshot
   */
  capture(options?: ScreenshotOptions): Promise<ScreenshotEntry>

  /**
   * Compare two screenshots
   *
   * @param actual - Screenshot to verify
   * @param baseline - Expected screenshot
   * @param threshold - Maximum acceptable diff ratio (0-1, defaults to 0)
   * @returns Comparison result with pass/fail and diff data
   */
  compare(
    actual: ScreenshotEntry,
    baseline: ScreenshotEntry,
    threshold?: number,
  ): Promise<ComparisonResult>
}
