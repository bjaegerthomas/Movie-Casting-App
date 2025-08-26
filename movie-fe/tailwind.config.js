// import the type for better DX in config
import type { Config } from 'tailwindcss'

// export a default Tailwind config object
export default {
  // tell Tailwind where to look for class names
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // enable dark mode via a CSS class we’ll manage on <html>
  darkMode: 'class',
  // extend the theme with a soft shadow we’ll reuse
  theme: {
    extend: {
      boxShadow: {
        // a subtle elevated card look
        soft: '0 6px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  // we’re not adding plugins in this starter
  plugins: [],
// assert type to ensure correct intellisense
} satisfies Config
