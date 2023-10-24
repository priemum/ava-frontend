export const systemSettings = {
  darkMode: false,
  colors: {
    light: {
      primary: "rgba(8, 12, 19, 1)",
      secondary: "rgba(221, 178, 110, 1)",
      third: "white",
      fourth: "rgba(111, 111, 111, 0.50)",
      fifth: "rgba(50, 50, 50, 1)",
    },
    dark: {
      primary: "",
      secondary: "",
      third: "",
      fourth: "",
      fifth: "",
    },
  },
};

export default systemSettings.darkMode
  ? systemSettings.colors.dark
  : systemSettings.colors.light; // this is for tailwind since it only works with export default (module)
