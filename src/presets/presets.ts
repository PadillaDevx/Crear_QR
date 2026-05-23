import type { QRConfig, Preset } from '../types/qr.types';

// ─── Factory for an empty gradient (disabled) ───────────────────────────────────
const noGradient = (color1 = '#000000', color2 = '#000000') => ({
  enabled: false,
  type: 'linear' as const,
  rotation: 45,
  color1,
  color2,
});

// ─── Application-wide default config ───────────────────────────────────────────
export const DEFAULT_CONFIG: QRConfig = {
  url:                   'https://example.com',
  logo:                  null,
  logoSize:              0.28,
  logoMargin:            8,
  dotColor:              '#000000',
  backgroundColor:       '#FFFFFF',
  cornerSquareColor:     '#000000',
  cornerDotColor:        '#000000',
  dotType:               'rounded',
  cornerSquareType:      'extra-rounded',
  cornerDotType:         'dot',
  gradient:              noGradient(),
  transparentBackground: false,
  errorCorrectionLevel:  'H',
  size:                  300,
};

// ─── Visual presets ─────────────────────────────────────────────────────────────
export const PRESETS: Preset[] = [
  {
    id:          'minimal',
    name:        'Minimal',
    description: 'Limpio y clásico',
    config: {
      dotColor:          '#000000',
      backgroundColor:   '#FFFFFF',
      cornerSquareColor: '#000000',
      cornerDotColor:    '#000000',
      dotType:           'square',
      cornerSquareType:  'square',
      cornerDotType:     'square',
      gradient:          noGradient('#000000', '#000000'),
      transparentBackground: false,
    },
  },
  {
    id:          'industrial',
    name:        'Industrial',
    description: 'Naranja construcción',
    config: {
      dotColor:          '#FF6B35',
      backgroundColor:   '#1A1A1A',
      cornerSquareColor: '#FF6B35',
      cornerDotColor:    '#FFFFFF',
      dotType:           'classy',
      cornerSquareType:  'square',
      cornerDotType:     'square',
      gradient:          noGradient('#FF6B35', '#E84855'),
      transparentBackground: false,
    },
  },
  {
    id:          'luxury',
    name:        'Luxury',
    description: 'Negro y dorado premium',
    config: {
      dotColor:          '#C9A84C',
      backgroundColor:   '#0D0D0D',
      cornerSquareColor: '#C9A84C',
      cornerDotColor:    '#C9A84C',
      dotType:           'extra-rounded',
      cornerSquareType:  'extra-rounded',
      cornerDotType:     'dot',
      gradient: {
        enabled:  true,
        type:     'linear',
        rotation: 135,
        color1:   '#C9A84C',
        color2:   '#8B6914',
      },
      transparentBackground: false,
    },
  },
  {
    id:          'dark',
    name:        'Dark',
    description: 'Oscuro moderno',
    config: {
      dotColor:          '#F5F5F5',
      backgroundColor:   '#111111',
      cornerSquareColor: '#6366F1',
      cornerDotColor:    '#6366F1',
      dotType:           'rounded',
      cornerSquareType:  'extra-rounded',
      cornerDotType:     'dot',
      gradient:          noGradient('#F5F5F5', '#A0A0A0'),
      transparentBackground: false,
    },
  },
  {
    id:          'concrete',
    name:        'Concrete',
    description: 'Gris cemento',
    config: {
      dotColor:          '#F2F2F2',
      backgroundColor:   '#3D3D3D',
      cornerSquareColor: '#F2F2F2',
      cornerDotColor:    '#F2F2F2',
      dotType:           'classy-rounded',
      cornerSquareType:  'square',
      cornerDotType:     'square',
      gradient:          noGradient('#F2F2F2', '#BDBDBD'),
      transparentBackground: false,
    },
  },
];
