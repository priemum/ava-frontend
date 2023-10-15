/** @type {import('tailwindcss').Config} */
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
        offWhite: "#F1F1F1",

        primary: "#AA8A3A",
        secondary: "#161535",
        third: "#F4F4F4",
      },
      backgroundImage: {
        headerBg: "url(./src/assets/images/home/headerBg.png)",
        contactLinesBg: "url(./src/assets/images/home/contactLines.svg)",
        membersLinesBg: "url(./src/assets/images/aboutus/members-lines.svg)",
      },
      backgroundColor: {
        redss:
          "radial-gradient(152.99% 768.95% at 126.35% 26.15%, #1A5F7A 0%, #57C5B6 27.72%, #159895 70.83%, #27E1C1 100%)",
      },
    },
  },
  plugins: [],
};
