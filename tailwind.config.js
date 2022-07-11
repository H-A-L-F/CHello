/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
    },
  },
  daisyui: {
    themes: ["coffee", "emerald"],
  },
  plugins: [require("daisyui")],
}
