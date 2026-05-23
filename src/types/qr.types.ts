// ─── QR Dot / Corner shape literals ────────────────────────────────────────────
export type DotType =
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'extra-rounded' | 'square';
export type CornerDotType    = 'dot' | 'square';
export type GradientType     = 'linear' | 'radial';
export type ErrorLevel       = 'H' | 'Q' | 'M' | 'L';

// ─── Gradient sub-config ────────────────────────────────────────────────────────
export interface GradientConfig {
  enabled:  boolean;
  type:     GradientType;
  /** Degrees (0-360) – converted to radians when passed to the library */
  rotation: number;
  color1:   string;
  color2:   string;
}

// ─── Main QR configuration ──────────────────────────────────────────────────────
export interface QRConfig {
  /** Destination URL encoded in the QR */
  url: string;

  /** Base64 data-URL of the uploaded logo, or null if none */
  logo: string | null;
  /** Logo size as a fraction of QR size – keep ≤ 0.35 for reliable scanning */
  logoSize:   number;
  /** Transparent padding around logo (px) */
  logoMargin: number;

  // Colours
  dotColor:          string;
  backgroundColor:   string;
  cornerSquareColor: string;
  cornerDotColor:    string;

  // Shapes
  dotType:          DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType:    CornerDotType;

  // Gradient (applied to dots when enabled)
  gradient: GradientConfig;

  /** When true background is set to 'transparent' (best with SVG export) */
  transparentBackground: boolean;

  /** QR error correction level. Always keep 'H' when a logo is used. */
  errorCorrectionLevel: ErrorLevel;

  /** Preview canvas size in px */
  size: number;
}

// ─── Visual preset ──────────────────────────────────────────────────────────────
export interface Preset {
  id:          string;
  name:        string;
  description: string;
  config:      Partial<QRConfig>;
}
