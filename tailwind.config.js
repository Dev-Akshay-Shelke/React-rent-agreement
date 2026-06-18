/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep:    '#0C1F3F',   // deep navy
          steel:   '#1A5276',   // mid navy
          teal:    '#0891B2',   // saturated teal
          mint:    '#34D399',   // emerald
          cta:     '#0EA5E9',   // sky blue — primary action
          light:   '#F0F9FF',   // light surface
          muted:   '#64748B',   // secondary text
          border:  '#E2E8F0',   // borders
        },
      },
      fontFamily: {
        sans:    ['Inter',   'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter',     'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass:        '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.10)',
        'glow-sm':    '0 0 16px rgba(14,165,233,0.30)',
        glow:         '0 0 32px rgba(14,165,233,0.40)',
        'glow-teal':  '0 0 24px rgba(8,145,178,0.35)',
        card:         '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(12,31,63,0.14)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'float':   'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
