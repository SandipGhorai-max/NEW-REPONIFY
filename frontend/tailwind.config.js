/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Chiffonn', 'DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
        },
        colors: {
            brand: {
                bg: '#080b12',
                surface: '#0d1117',
                surface2: '#161b22',
                primary: '#00d4ff',
                secondary: '#00ff88',
                accent: '#7c3aed',
                border: '#21262d',
                danger: '#f85149'
            },
            zinc: {
                950: '#0d1117',
                900: '#161b22',
                800: '#21262d',
                700: '#30363d',
                600: '#8b949e',
                500: '#8b949e',
                400: '#8b949e',
                300: '#c9d1d9',
                200: '#e6edf3',
                100: '#f0f6fc',
                50:  '#ffffff',
            },
            cyan: { 400: '#00d4ff', 500: '#00d4ff', 600: '#00b3d6' },
        },
        keyframes: {
            shimmer: {
                '0%':   { backgroundPosition: '-200% 0' },
                '100%': { backgroundPosition:  '200% 0' },
            },
            marquee: {
                '0%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-50%)' },
            },
            marqueeReverse: {
                '0%': { transform: 'translateX(-50%)' },
                '100%': { transform: 'translateX(0%)' },
            },
            fadeUp: {
                '0%':   { opacity: '0', transform: 'translateY(24px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            blink: {
                '0%, 100%': { opacity: '1' },
                '50%':      { opacity: '0' },
            },
            pulse: {
                '0%, 100%': { opacity: '1' },
                '50%':      { opacity: '0.4' },
            },
        },
        animation: {
            shimmer:  'shimmer 2s linear infinite',
            'fade-up': 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            blink:    'blink 1s step-end infinite',
            marquee: 'marquee 30s linear infinite',
            'marquee-reverse': 'marqueeReverse 30s linear infinite',
        },
    },
  },
  plugins: [],
}
