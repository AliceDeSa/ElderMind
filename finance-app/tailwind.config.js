/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',     // Todo preto
        surfaceCard: '#101012',    // Apenas um tom acima do preto
        primary: '#9333ea',        // Roxo vibrante (Purple 600)
        primaryHover: '#7e22ce',   // Purple 700
        textTitle: '#c084fc',      // Roxo mais vibrante (Purple 400) - Era #d8b4fe (Purple 300)
        textMain: '#e4e4e7',       // Zinc 200
        textSecondary: '#a1a1aa',  // Zinc 400
        inputBg: '#18181b',        // Zinc 900
        border: '#27272a',         // Zinc 800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
