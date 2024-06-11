/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js, ts, jsx, tsx}"],
  theme: {
    colors: {
      'preto': '#000',
      'branco': colors.white,
      'verde': colors.green,
      'vermelho': colors.red,
      azul: {
        
        500: '#235796',
        600: '#193F6D',
        700: '#0F2743'
      },
      ciano: {
        500: '#03FFF6',
        600: '#00CFC8',
        700: '#009c97'
      }
    },
    extend: {},
  },
  plugins: [],
}
