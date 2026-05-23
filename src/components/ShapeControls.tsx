import type { QRConfig, DotType, CornerSquareType, CornerDotType } from '../types/qr.types';

interface ShapeControlsProps {
  config:   QRConfig;
  onChange: (patch: Partial<QRConfig>) => void;
}

interface OptionGroup<T extends string> {
  label:   string;
  value:   T;
  preview: string; // emoji / mini SVG description for the pill
}

// ─── Option data ─────────────────────────────────────────────────────────────────
const DOT_TYPES: OptionGroup<DotType>[] = [
  { label: 'Square',          value: 'square',         preview: '▪' },
  { label: 'Rounded',         value: 'rounded',        preview: '▫' },
  { label: 'Dots',            value: 'dots',           preview: '•' },
  { label: 'Classy',          value: 'classy',         preview: '◆' },
  { label: 'Classy-R',        value: 'classy-rounded', preview: '◇' },
  { label: 'Extra-R',         value: 'extra-rounded',  preview: '◉' },
];

const CORNER_SQUARE_TYPES: OptionGroup<CornerSquareType>[] = [
  { label: 'Square',     value: 'square',       preview: '□' },
  { label: 'Dot',        value: 'dot',          preview: '○' },
  { label: 'Extra-R',    value: 'extra-rounded', preview: '◎' },
];

const CORNER_DOT_TYPES: OptionGroup<CornerDotType>[] = [
  { label: 'Square', value: 'square', preview: '■' },
  { label: 'Dot',    value: 'dot',    preview: '●' },
];

// ─── Generic pill selector ────────────────────────────────────────────────────────
function PillSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label:    string;
  options:  OptionGroup<T>[];
  value:    T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.value}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
              value === opt.value
                ? 'bg-accent/10 border-accent text-white'
                : 'border-border text-muted hover:border-accent/30 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">{opt.preview}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────────
const ShapeControls = ({ config, onChange }: ShapeControlsProps) => (
  <div className="space-y-3">
    <p className="text-[11px] font-semibold tracking-widest uppercase text-muted">Formas</p>

    <div className="space-y-4 bg-surface-100 border border-border rounded-lg p-3">
      <PillSelector
        label="Estilo de puntos"
        options={DOT_TYPES}
        value={config.dotType}
        onChange={(v) => onChange({ dotType: v })}
      />
      <PillSelector
        label="Marco de esquinas"
        options={CORNER_SQUARE_TYPES}
        value={config.cornerSquareType}
        onChange={(v) => onChange({ cornerSquareType: v })}
      />
      <PillSelector
        label="Centro de esquinas"
        options={CORNER_DOT_TYPES}
        value={config.cornerDotType}
        onChange={(v) => onChange({ cornerDotType: v })}
      />
    </div>
  </div>
);

export default ShapeControls;
