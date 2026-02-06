import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF204E',
          dark: '#A0153E',
          darker: '#4B0B35',
        },
        secondary: {
          DEFAULT: '#23203C',
          dark: '#13132b',
        },
        accent: '#6A5ACD',
      },
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
