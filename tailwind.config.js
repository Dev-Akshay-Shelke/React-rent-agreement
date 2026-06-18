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
          deep:    '#1A2B49',   // primary navy for text and structure
          steel:   '#243A63',   // secondary navy surfaces
          teal:    '#28A745',   // success / primary action
          mint:    '#DFF3E3',   // soft success tint
          cta:     '#0055DA',   // secondary action / links
          light:   '#F7F6F0',   // off-white section surface
          muted:   '#55657E',   // body text
          border:  '#D8E0EA',   // subtle utility lines
          success: '#28A745',
          link:    '#0055DA',
        },
      },
      fontFamily: {
        sans:    ['Inter',   'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter',     'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass:        '0 12px 34px rgba(26,43,73,0.10), inset 0 1px 0 rgba(255,255,255,0.70)',
        'glow-sm':    '0 0 16px rgba(40,167,69,0.18)',
        glow:         '0 0 32px rgba(0,85,218,0.22)',
        'glow-teal':  '0 0 24px rgba(40,167,69,0.18)',
        card:         '0 1px 3px rgba(26,43,73,0.05), 0 8px 24px rgba(26,43,73,0.06)',
        'card-hover': '0 8px 18px rgba(26,43,73,0.06), 0 20px 36px rgba(26,43,73,0.10)',
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
