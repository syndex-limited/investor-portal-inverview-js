const primaryPurple = "#6137a5"
const primaryGreen = "#83e5b6"
const primaryBlue = "#4ac2c1"

const tintDarkPurple = "#250c6b"
const tintDarkGreen = "#43ce82"
const tintDarkBlue = "#159492"

const secondaryBlackBlue = "#100623"
const secondaryDarkGrey = "#81818d"
const secondaryMediumGrey = "#c3c8c9"
const secondaryLightGrey = "#f9f9f9"
const secondaryWhite = "#fff"

module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: secondaryBlackBlue,
      white: secondaryWhite,
      purple: {
        primary: primaryPurple,
        tint: tintDarkPurple,
      },
      green: {
        primary: primaryGreen,
        tint: tintDarkGreen,
      },
      blue: {
        primary: primaryBlue,
        tint: tintDarkBlue,
      },
      gray: {
        light: secondaryLightGrey,
        medium: secondaryMediumGrey,
        dark: secondaryDarkGrey,
      },
    },
  },
  variants: {},
  plugins: [],
}
