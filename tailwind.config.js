const colors = require("tailwindcss/colors");

module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#33a125",
      black: colors.black,
    },
    boxShadow: {
      "2xl": "0px 0px 200px 5px #33a125",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
