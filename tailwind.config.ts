import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        'button.primary': {
          backgroundColor: 'rgb(var(--primary-rgb))',
          border: '1px solid rgb(var(--secondary-rgb))',
          color: 'white',
        },
        'button.secondary': {
          backgroundColor: 'rgb(var(--secondary-rgb))',
          border: '1px solid rgb(var(--primary-rgb))',
          color: 'rgb(var(--primary-rgb))',
        },
      }
      const header = {
        header: {
          background:
            'linear-gradient(1deg, rgb(50, 170, 255) 11%, rgb(16, 52, 166) 141%)',
        },
      }
      addComponents(buttons)
      addComponents(header)
    }),
  ],
}
export default config
