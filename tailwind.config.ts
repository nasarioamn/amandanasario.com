import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0d9488', // teal-600
          light: '#14b8a6',  // teal-500
          dark: '#0f766e',   // teal-700
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1c1917',
            a: {
              color: '#0d9488',
              '&:hover': { color: '#0f766e' },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
