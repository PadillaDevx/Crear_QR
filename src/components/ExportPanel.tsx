import type { QRConfig } from '../types/qr.types';
import { Download } from 'lucide-react';
import { useQRGenerator } from '../hooks/useQRGenerator';

interface ExportPanelProps {
  config: QRConfig;
}

const RESOLUTIONS = [512, 1024, 2048] as const;

/**
 * Dedicated export panel with resolution selector and format buttons.
 * Uses its own QRGenerator instance at the chosen resolution to avoid
 * affecting the preview.
 */
const ExportPanel = ({ config }: ExportPanelProps) => {
  // We instantiate a dedicated (hidden) QR instance for export only.
  // The container is never mounted in the DOM – we just need the instance.
  const { downloadPNG, downloadSVG } = useQRGenerator(config);

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted">Exportar</p>

      <div className="bg-surface-100 border border-border rounded-lg p-3 space-y-3">
        <p className="text-[11px] text-muted">Resolución PNG</p>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTIONS.map((res) => (
            <button
              key={res}
              type="button"
              onClick={() => downloadPNG('qr-code', res)}
              className="flex flex-col items-center gap-1 py-2 rounded-lg border border-border
                hover:border-accent/40 hover:bg-accent/5 text-muted hover:text-white
                active:scale-95 transition-all"
            >
              <Download size={13} />
              <span className="text-[11px] font-mono">{res}px</span>
            </button>
          ))}
        </div>

        <hr className="border-border/50" />

        <button
          type="button"
          onClick={() => downloadSVG('qr-code')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border
            border-accent/40 text-accent hover:bg-accent/10 active:scale-95 transition-all text-sm font-semibold"
        >
          <Download size={15} />
          Exportar SVG vectorial
        </button>

        <p className="text-[10px] text-muted/50 text-center">
          SVG es ilimitado en resolución. Ideal para impresión.
        </p>
      </div>
    </div>
  );
};

export default ExportPanel;
