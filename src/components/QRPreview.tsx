import { useRef } from 'react';
import { useQRGenerator } from '../hooks/useQRGenerator';
import type { QRConfig } from '../types/qr.types';

interface QRPreviewProps {
  config: QRConfig;
}

/**
 * Renders the live QR preview using qr-code-styling.
 * The underlying SVG is appended directly into the container div and updated
 * reactively by the hook whenever config changes.
 */
const QRPreview = ({ config }: QRPreviewProps) => {
  const { containerRef, downloadPNG, downloadSVG } = useQRGenerator(config);

  // Expose download methods to parent via a stable ref trick – simpler to keep
  // the export panel inline with the preview in this layout.
  const downloadRef = useRef({ downloadPNG, downloadSVG });
  downloadRef.current = { downloadPNG, downloadSVG };

  // Checkerboard CSS pattern to visualise transparency
  const transparencyBg =
    'repeating-conic-gradient(#3a3a3a 0% 25%, #2a2a2a 0% 50%) 0 0 / 16px 16px';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview frame */}
      <div
        className="rounded-xl overflow-hidden shadow-2xl border border-border/60 p-2"
        style={{
          background: config.transparentBackground
            ? transparencyBg
            : config.backgroundColor,
        }}
      >
        <div
          ref={containerRef}
          className="transition-opacity duration-200"
          style={{ width: config.size, height: config.size }}
        />
      </div>

      {/* Quick export buttons */}
      <div className="flex gap-2 w-full">
        <button
          type="button"
          onClick={() => downloadRef.current.downloadPNG('qr-code', 1200)}
          className="flex-1 py-2.5 rounded-lg bg-accent hover:bg-accent-dim active:scale-95
            text-white text-sm font-semibold tracking-wide transition-all"
        >
          ↓ PNG
        </button>
        <button
          type="button"
          onClick={() => downloadRef.current.downloadSVG('qr-code')}
          className="flex-1 py-2.5 rounded-lg bg-surface-50 hover:bg-surface-100 border border-border
            active:scale-95 text-white text-sm font-semibold tracking-wide transition-all"
        >
          ↓ SVG
        </button>
      </div>

      {/* Scanability badge */}
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
        <span>
          Corrección de errores:{' '}
          <span className="text-white font-semibold">{config.errorCorrectionLevel}</span>
          {config.logo && ' — Logo con nivel H activo'}
        </span>
      </div>
    </div>
  );
};

export default QRPreview;
