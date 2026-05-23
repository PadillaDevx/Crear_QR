import type { QRConfig } from '../types/qr.types';

interface ColorControlsProps {
  config:   QRConfig;
  onChange: (patch: Partial<QRConfig>) => void;
}

interface ColorRowProps {
  label:    string;
  value:    string;
  onChange: (v: string) => void;
}

// Reusable label + native color-input row
const ColorRow = ({ label, value, onChange }: ColorRowProps) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-xs text-muted whitespace-nowrap">{label}</span>
    <label className="flex items-center gap-2 cursor-pointer group">
      <span className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
        {value.toUpperCase()}
      </span>
      <div
        className="w-7 h-7 rounded-md border border-border/60 overflow-hidden
          hover:scale-110 transition-transform cursor-pointer"
        style={{ background: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="opacity-0 w-full h-full cursor-pointer"
        />
      </div>
    </label>
  </div>
);

// ─── Toggle ──────────────────────────────────────────────────────────────────────
interface ToggleProps {
  label:    string;
  checked:  boolean;
  onChange: (v: boolean) => void;
}
const Toggle = ({ label, checked, onChange }: ToggleProps) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-muted">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors ${
        checked ? 'bg-accent' : 'bg-surface-50'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────────
const ColorControls = ({ config, onChange }: ColorControlsProps) => {
  const { gradient } = config;

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted">Colores</p>

      <div className="space-y-2.5 bg-surface-100 border border-border rounded-lg p-3">
        <ColorRow
          label="Puntos QR"
          value={config.dotColor}
          onChange={(v) => onChange({ dotColor: v })}
        />
        <ColorRow
          label="Fondo"
          value={config.backgroundColor}
          onChange={(v) => onChange({ backgroundColor: v })}
        />
        <ColorRow
          label="Esquinas"
          value={config.cornerSquareColor}
          onChange={(v) => onChange({ cornerSquareColor: v })}
        />
        <ColorRow
          label="Centro esquinas"
          value={config.cornerDotColor}
          onChange={(v) => onChange({ cornerDotColor: v })}
        />

        <hr className="border-border/50" />

        <Toggle
          label="Fondo transparente"
          checked={config.transparentBackground}
          onChange={(v) => onChange({ transparentBackground: v })}
        />
      </div>

      {/* ─── Gradient section ───────────────────────────────── */}
      <div className="space-y-2.5 bg-surface-100 border border-border rounded-lg p-3">
        <Toggle
          label="Gradiente en puntos"
          checked={gradient.enabled}
          onChange={(v) => onChange({ gradient: { ...gradient, enabled: v } })}
        />

        {gradient.enabled && (
          <div className="space-y-2.5 animate-fade-in">
            {/* Type selector */}
            <div className="flex gap-2">
              {(['linear', 'radial'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange({ gradient: { ...gradient, type: t } })}
                  className={`flex-1 py-1 text-xs rounded-md border transition-all capitalize ${
                    gradient.type === t
                      ? 'bg-accent border-accent text-white'
                      : 'border-border text-muted hover:border-accent/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <ColorRow
              label="Color inicial"
              value={gradient.color1}
              onChange={(v) => onChange({ gradient: { ...gradient, color1: v } })}
            />
            <ColorRow
              label="Color final"
              value={gradient.color2}
              onChange={(v) => onChange({ gradient: { ...gradient, color2: v } })}
            />

            {gradient.type === 'linear' && (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted">Ángulo</span>
                  <span className="text-xs font-mono text-accent">{gradient.rotation}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={gradient.rotation}
                  onChange={(e) =>
                    onChange({ gradient: { ...gradient, rotation: Number(e.target.value) } })
                  }
                  className="w-full accent-orange-500 h-1 rounded-full cursor-pointer"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorControls;
