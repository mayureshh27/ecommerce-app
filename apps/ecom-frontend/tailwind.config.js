/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Inter var, ui-sans-serif, system-ui',
      serif: 'Inter var, ui-sans-serif, system-ui',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1.3rem',
      xl: '1.55rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        fantasy: {
          primary: '#0000ff',
          'primary-content': 'white',
          secondary: '#F6F6F6',
          neutral: '#E8E8E8',
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root'
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}