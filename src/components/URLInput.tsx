import { Link, AlertCircle } from 'lucide-react';

interface URLInputProps {
  value:    string;
  onChange: (url: string) => void;
}

// Very lightweight URL check – full validation happens server-side if ever deployed
const isValidURL = (s: string) => {
  if (!s) return null; // neutral – nothing typed yet
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const URLInput = ({ value, onChange }: URLInputProps) => {
  const valid = isValidURL(value);

  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted">
        URL destino
      </label>

      <div className="relative">
        <Link
          size={14}
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
            valid === false ? 'text-red-500' : valid === true ? 'text-accent' : 'text-muted'
          }`}
        />

        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://tu-sitio.com"
          spellCheck={false}
          className={`w-full bg-surface-100 border rounded-lg pl-9 pr-4 py-2.5 text-sm text-white
            placeholder:text-muted/40 outline-none transition-all font-mono
            focus:ring-1 ${
              valid === false
                ? 'border-red-500/60 focus:ring-red-500/30'
                : valid === true
                ? 'border-accent/50 focus:ring-accent/20'
                : 'border-border focus:ring-accent/20 focus:border-accent/40'
            }`}
        />
      </div>

      {valid === false && (
        <p className="flex items-center gap-1.5 text-[11px] text-red-400 animate-fade-in">
          <AlertCircle size={11} />
          Ingresa una URL válida (https://…)
        </p>
      )}
    </div>
  );
};

export default URLInput;
