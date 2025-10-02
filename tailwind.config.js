// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./public/**/*.md" 
  ],
  theme: {
    extend: {
      // custom theme overrides if any
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
