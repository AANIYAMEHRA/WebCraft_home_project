/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gm: {
          deep: '#0B2447',
          navy: '#19376D',
          blue: '#1A6FA0',
          teal: '#2A9D8F',
          green: '#40B87D',
          mint: '#6EDAA0',
          light: '#E8F5F0',
          ghost: '#F0F9F5',
          slate: '#334155',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
