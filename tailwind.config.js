/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        plane: "url('/src/plane.jpeg')",
      },
    },
  },
  plugins: [],
};
