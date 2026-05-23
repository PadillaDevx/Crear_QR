import { PRESETS } from '../presets/presets';
import type { QRConfig, Preset } from '../types/qr.types';

interface PresetBarProps {
  config:   QRConfig;
  onApply:  (patch: Partial<QRConfig>) => void;
}

// Small swatch that visually represents a preset's main colors
const Swatch = ({ preset }: { preset: Preset }) => {
  const bg  = (preset.config.backgroundColor   as string | undefined) ?? '#FFFFFF';
  const dot = (preset.config.dotColor           as string | undefined) ?? '#000000';
  return (
    <div
      className="w-4 h-4 rounded-full border border-white/10 flex items-center justify-center"
      style={{ background: bg }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
    </div>
  );
};

const PresetBar = ({ config, onApply }: PresetBarProps) => {
  // Detect which preset (if any) is currently active
  const activeId = PRESETS.find((p) => {
    const cfg = p.config;
    return (
      (!cfg.dotColor          || cfg.dotColor          === config.dotColor) &&
      (!cfg.backgroundColor   || cfg.backgroundColor   === config.backgroundColor) &&
      (!cfg.cornerSquareColor || cfg.cornerSquareColor === config.cornerSquareColor) &&
      (!cfg.dotType           || cfg.dotType           === config.dotType)
    );
  })?.id;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted">
        Presets visuales
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.config)}
            title={preset.description}
            className={`flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg border text-center
              transition-all group ${
              activeId === preset.id
                ? 'border-accent bg-accent/10 text-white'
                : 'border-border text-muted hover:border-accent/30 hover:bg-accent/5 hover:text-white'
            }`}
          >
            <Swatch preset={preset} />
            <span className="text-[10px] font-medium leading-tight">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetBar;
