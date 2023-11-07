import React from "react";
import { data } from "../../../data/aboutUsData";
import GradientText from "../GradientText";
import pattern from "../../../assets/images/pattern.svg";

const PageHeader = ({ text }) => {
  return (
    <div
      className="w-full h-[60vh] flex justify-center items-center bg-primary bg-no-repeat bg-cover bg-center relative overflow-hidden rounded-b-xl"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundPosition: "100% 20%",
      }}
    >
      <div className="absolute -left-[30vh] -top-[30vh] h-[60vh] w-[60vh] bg-white/30 rounded-full blur-[200px]" />
      <div className="absolute -right-[30vh] -bottom-[30vh] h-[60vh] w-[60vh] bg-white/30 rounded-full blur-[200px]" />
      <GradientText
        text={text}
        customStyle={
          "text-center text-big 2xl:text-bigger font-bold text-primary w-[90%] md:w-[50%]"
        }
        header
      />
    </div>
  );
};

export default PageHeader;
