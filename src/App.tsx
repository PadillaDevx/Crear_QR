import { useState, useCallback } from 'react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import LogoUpload from './components/LogoUpload';
import PresetBar from './components/PresetBar';
import ColorControls from './components/ColorControls';
import ShapeControls from './components/ShapeControls';
import QRPreview from './components/QRPreview';
import ExportPanel from './components/ExportPanel';
import { DEFAULT_CONFIG } from './presets/presets';
import type { QRConfig } from './types/qr.types';

function App() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);

  // Merge partial updates into current config
  const patch = useCallback((update: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...update }));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Header />

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">

        {/* ── Left panel: controls ──────────────────────────────────────── */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0
          border-b lg:border-b-0 lg:border-r border-[#2e2e2e]
          overflow-y-auto">
          <div className="p-5 space-y-6">

            {/* URL */}
            <URLInput
              value={config.url}
              onChange={(url) => patch({ url })}
            />

            {/* Logo */}
            <LogoUpload
              logo={config.logo}
              logoSize={config.logoSize}
              onChange={(logo) => patch({ logo })}
              onSizeChange={(logoSize) => patch({ logoSize })}
            />

            {/* Presets */}
            <PresetBar config={config} onApply={patch} />

            {/* Colors */}
            <ColorControls config={config} onChange={patch} />

            {/* Shapes */}
            <ShapeControls config={config} onChange={patch} />

            {/* Export panel (detail) */}
            <ExportPanel config={config} />

            {/* Reset */}
            <button
              type="button"
              onClick={() => setConfig(DEFAULT_CONFIG)}
              className="w-full py-2 text-xs text-muted hover:text-white border border-[#2e2e2e]
                hover:border-[#444] rounded-lg transition-all"
            >
              Restablecer configuración
            </button>

          </div>
        </aside>

        {/* ── Right panel: live preview ─────────────────────────────────── */}
        <section className="flex-1 flex items-center justify-center p-8 lg:p-12
          bg-[#0d0d0d] relative overflow-hidden">

          {/* Subtle grid background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
            {/* Label */}
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6b6b6b]">
              Vista previa en tiempo real
            </p>

            <QRPreview config={config} />

            {/* Tip */}
            <p className="text-[11px] text-[#6b6b6b] text-center max-w-xs">
              El QR utiliza corrección de errores{' '}
              <span className="text-white font-semibold">Nivel H (30%)</span> para máxima
              tolerancia con logos y personalización.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
