import { Scan } from 'lucide-react';

const Header = () => (
  <header className="flex items-center gap-3 px-6 py-4 border-b border-border">
    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/30">
      <Scan size={18} className="text-accent" />
    </div>
    <div>
      <h1 className="text-sm font-semibold text-white tracking-widest uppercase">
        QR Studio
      </h1>
      <p className="text-[10px] text-muted tracking-wider uppercase">
        Professional QR Generator
      </p>
    </div>
    <div className="ml-auto">
      <span className="text-[10px] font-mono text-muted/60 border border-border px-2 py-0.5 rounded">
        v1.0
      </span>
    </div>
  </header>
);

export default Header;
