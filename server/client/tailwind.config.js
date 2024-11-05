/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fece51', // Custom color
        'primary-dark': '#f0b200', // Darker shade for hover
      },
    },
  },
  plugins: [],
}
