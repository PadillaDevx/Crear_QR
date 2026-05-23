import { useRef } from 'react';
import { Upload, X, AlertTriangle } from 'lucide-react';

interface LogoUploadProps {
  logo:     string | null;
  logoSize: number;
  onChange: (logo: string | null) => void;
  onSizeChange: (size: number) => void;
}

const LogoUpload = ({ logo, logoSize, onChange, onSizeChange }: LogoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Only accept image files
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-uploaded
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted">
        Logo central
      </label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative border border-dashed border-border rounded-lg p-4 cursor-pointer
          hover:border-accent/40 hover:bg-accent/5 transition-all group"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {logo ? (
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo preview"
              className="w-10 h-10 object-contain rounded border border-border bg-white/5"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">Logo cargado</p>
              <p className="text-[11px] text-muted">Click para cambiar</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="p-1.5 rounded-md hover:bg-red-500/10 hover:text-red-400 text-muted transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <Upload size={18} className="text-muted group-hover:text-accent transition-colors" />
            <p className="text-xs text-muted text-center">
              Arrastra o haz click para subir
            </p>
            <p className="text-[10px] text-muted/50">PNG, SVG, WebP recomendado</p>
          </div>
        )}
      </div>

      {/* Logo size slider – only shown when a logo is loaded */}
      {logo && (
        <div className="space-y-1.5 animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-muted">Tamaño del logo</span>
            <span className="text-[11px] font-mono text-accent">
              {Math.round(logoSize * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={35}
            step={1}
            value={Math.round(logoSize * 100)}
            onChange={(e) => onSizeChange(Number(e.target.value) / 100)}
            className="w-full accent-orange-500 h-1 rounded-full cursor-pointer"
          />
          {logoSize > 0.32 && (
            <p className="flex items-center gap-1.5 text-[11px] text-yellow-500 animate-fade-in">
              <AlertTriangle size={11} />
              Logo grande puede reducir la escaneabilidad
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoUpload;
