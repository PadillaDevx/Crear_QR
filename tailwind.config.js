/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Industrial dark palette
        surface: {
          50:  '#2a2a2a',
          100: '#1f1f1f',
          200: '#161616',
          300: '#0f0f0f',
          900: '#080808',
        },
        border: '#2e2e2e',
        accent: {
          DEFAULT: '#FF6B35',
          dim:    '#cc5628',
          light:  '#ff8f65',
        },
        gold: {
          DEFAULT: '#C9A84C',
          dim:    '#8B6914',
        },
        muted: '#6b6b6b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

