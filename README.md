# QR Studio — Professional QR Generator

Generador profesional de códigos QR personalizados para branding empresarial.  
Construido con **Vite + React + TypeScript + Tailwind CSS + qr-code-styling**.

---

## Por qué este stack

| Herramienta | Razón |
|---|---|
| **Vite** | HMR instantáneo, build ultra-rápido |
| **React + TypeScript** | Componentes tipados, mantenibles y escalables |
| **Tailwind CSS v3** | Estilo industrial sin CSS custom extra |
| **qr-code-styling** | Librería de facto para QR personalizados: gradientes, logos, formas, SVG/PNG export |
| **lucide-react** | Iconos limpios y ligeros |

---

## Inicio rápido

```bash
cd qr-studio
npm install
npm run dev
```

Abre http://localhost:5173

---

## Estructura del proyecto

```
qr-studio/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx          → Cabecera y branding
│   │   ├── URLInput.tsx        → Campo URL con validación
│   │   ├── LogoUpload.tsx      → Drag & drop + size slider
│   │   ├── PresetBar.tsx       → 5 presets visuales
│   │   ├── ColorControls.tsx   → Colores + gradiente
│   │   ├── ShapeControls.tsx   → Estilos de puntos y esquinas
│   │   ├── QRPreview.tsx       → Preview en tiempo real + export rápido
│   │   └── ExportPanel.tsx     → Panel de exportación (PNG multi-res + SVG)
│   ├── hooks/
│   │   └── useQRGenerator.ts   → Hook QR: instancia, update reactivo, download
│   ├── presets/
│   │   └── presets.ts          → DEFAULT_CONFIG + 5 presets
│   ├── types/
│   │   └── qr.types.ts         → Tipos TypeScript completos
│   ├── App.tsx                 → Layout principal + estado global
│   ├── main.tsx
│   └── index.css               → Tailwind directives + dark base
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## Características

### QR
- Códigos QR 100% escaneables
- Corrección de errores Nivel H (30%) — máxima tolerancia con logos
- Logo central con tamaño controlado (menor o igual 35% para no romper el patrón)
- Vista previa en tiempo real (SVG instantáneo)

### Personalización
- 6 estilos de puntos: Square, Rounded, Dots, Classy, Classy-Rounded, Extra-Rounded
- 3 estilos de esquinas externas
- 2 estilos de esquinas internas
- Colores independientes: puntos, fondo, esquina externa, esquina interna
- Gradiente lineal/radial con ángulo configurable
- Fondo transparente

### Presets
| Preset | Descripción |
|---|---|
| Minimal | Negro/blanco clásico, bordes cuadrados |
| Industrial | Naranja construcción sobre oscuro |
| Luxury | Dorado degradado sobre negro profundo |
| Dark | Blanco/índigo sobre carbón oscuro |
| Concrete | Blanco suave sobre gris cemento |

### Exportación
- PNG a 512 / 1024 / 2048 px (alta resolución)
- SVG vectorial ilimitado (ideal para impresión)
- Botones rápidos PNG/SVG en la preview

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción (dist/)
npm run preview  # Preview del build
npm run lint     # ESLint
```

---

## Roadmap / SaaS futuro

- [ ] Guardar presets personalizados (localStorage / DB)
- [ ] Historial de QRs generados
- [ ] Autenticación y dashboard de usuario
- [ ] API REST para generación programática
- [ ] Templates por industria
- [ ] Analytics de escaneos (QR dinámicos)
- [ ] Exportación en PDF para impresión directa

---

## Notas de escaneabilidad

La prioridad siempre es que el QR funcione.

- Nivel H obligatorio cuando hay logo.
- Logo limitado a 35% del área total.
- Contraste mínimo recomendado entre puntos y fondo: 3:1.
- Los gradientes suaves son más seguros que contrastes extremos.
- Testea siempre el QR físicamente antes de imprimir.

---

Basado en el script original `main.py` (Python + qrcode + Pillow).  
Este proyecto lo evoluciona a una web app moderna con personalización visual completa.
