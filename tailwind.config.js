/** @type {import('tailwindcss').Config} */
import colors from "./src/settings";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "top-shadow": "0px -4px 3px rgba(50, 50, 50, 0.50)",
      },
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
        ServicesBackGround:
          "linear-gradient(92deg, rgba(90, 90, 90, 0.40) 15.42%, rgba(95, 95, 95, 0.26) 100.94%)",
      },
      backgroundColor: {},
      background: {},
    },
  },
  plugins: [],
};
