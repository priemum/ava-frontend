import React from "react";
// import GradientText from "../../../components/UI/GradientText";
// import { useTranslation } from "react-i18next";

const Location = () => {
  // const { t, i18n } = useTranslation();
  return (
    <div className="h-[50vh] w-full relative mt-16">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14441.703341395783!2d55.2696918!3d25.188858!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6965bad345df%3A0x97dc6af8848637a8!2sAva%20Real%20Estate!5e0!3m2!1sen!2s!4v1697820982359!5m2!1sen!2s"
        width="100%"
        height="100%"
        className="border-none !z-20"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      {/* <div className="max-md:hidden bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-500 shadow-lg rounded-md absolute top-1/2 -translate-y-1/2 right-[5%] md:w-1/4 !z-50 p-8 xl:p-12 space-y-8 ">
        <GradientText
          text={"You can find us at"}
          customStyle={"font-bold text-med"}
        />
        <p>{t("Address")}</p>
        <p> {t("Email")} </p>
        <p>  </p>
      </div> */}
    </div>
  );
};

export default Location;
