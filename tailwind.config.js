/** @type {import('tailwindcss').Config} */
import colors from "./src/settings";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        huge: "87px",
        mobileHuge: "60px",
        bigger: "70px",
        big: "45px",
        med: "30px",
        small: "23px",
        smaller: "20px",
        tiny: "16px",
      },
      fontFamily: {
        REG: "LAMASANSREGULAR", //400(normal)
        MED: "LAMASANSMEDIUM", //500
        BOLD: "LAMASANSBOLD", //700
        EXBOLD: "LAMASANSEXTRABOLD", //800
      },
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        third: colors.third,
        fourth: colors.fourth,
        fifth: colors.fifth,
      },
      backgroundImage: {
        buttonGrad:
          "linear-gradient(110deg, #DDB26E 13.14%, #FFE0AE 49.03%, #EFC27C 88.87%)",
      },
      backgroundColor: {},
      background: {},
    },
  },
  plugins: [],
};
