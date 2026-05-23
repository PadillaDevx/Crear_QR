import { useCallback, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRConfig } from '../types/qr.types';

/**
 * Converts degrees to radians for the qr-code-styling gradient API.
 */
const deg2rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Builds the qr-code-styling options object from a QRConfig.
 * Separated so it can be reused for both preview and high-res export.
 */
export const buildQROptions = (config: QRConfig, sizeOverride?: number) => {
  const size = sizeOverride ?? config.size;

  const dotsOptions = config.gradient.enabled
    ? {
        type: config.dotType,
        gradient: {
          type:     config.gradient.type,
          rotation: deg2rad(config.gradient.rotation),
          colorStops: [
            { offset: 0, color: config.gradient.color1 },
            { offset: 1, color: config.gradient.color2 },
          ],
        },
      }
    : { type: config.dotType, color: config.dotColor };

  return {
    width:  size,
    height: size,
    // SVG type gives the sharpest previews and best SVG exports
    type: 'svg' as const,
    data: config.url || 'https://example.com',
    // Only pass image prop when a logo exists (avoids library warnings)
    ...(config.logo ? { image: config.logo } : {}),
    qrOptions: {
      errorCorrectionLevel: config.errorCorrectionLevel,
    },
    dotsOptions,
    backgroundOptions: {
      color: config.transparentBackground ? 'transparent' : config.backgroundColor,
    },
    cornersSquareOptions: {
      type:  config.cornerSquareType,
      color: config.cornerSquareColor,
    },
    cornersDotOptions: {
      type:  config.cornerDotType,
      color: config.cornerDotColor,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize:          config.logoSize,
      margin:             config.logoMargin,
      crossOrigin:        'anonymous',
    },
  };
};

// ─── Hook ───────────────────────────────────────────────────────────────────────

interface UseQRGeneratorReturn {
  /** Attach this ref to the container <div> that will hold the QR */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Download PNG at a chosen resolution (default 1200 px) */
  downloadPNG:  (filename?: string, resolution?: number) => void;
  /** Download SVG vector file */
  downloadSVG:  (filename?: string) => void;
}

export const useQRGenerator = (config: QRConfig): UseQRGeneratorReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstance   = useRef<QRCodeStyling | null>(null);

  // ── Recreate the QR instance on every config change ─────────────────────────
  // qr-code-styling's update() has a known issue where SVG color/gradient
  // changes are not reliably applied. Recreating is the robust solution.
  useEffect(() => {
    if (!containerRef.current) return;

    qrInstance.current = new QRCodeStyling(buildQROptions(config));
    containerRef.current.innerHTML = '';
    qrInstance.current.append(containerRef.current);
  }, [config]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Download PNG at high resolution ─────────────────────────────────────────
  const downloadPNG = useCallback(
    (filename = 'qr-code', resolution = 1200) => {
      if (!qrInstance.current) return;

      // Temporarily create a second instance at the export resolution
      const exportQR = new QRCodeStyling(buildQROptions(config, resolution));
      exportQR.download({ name: filename, extension: 'png' });
    },
    [config],
  );

  // ── Download SVG ─────────────────────────────────────────────────────────────
  const downloadSVG = useCallback(
    (filename = 'qr-code') => {
      if (!qrInstance.current) return;
      // Use a fresh instance at 1024 px for a clean SVG
      const exportQR = new QRCodeStyling(buildQROptions(config, 1024));
      exportQR.download({ name: filename, extension: 'svg' });
    },
    [config],
  );

  return { containerRef, downloadPNG, downloadSVG };
};
