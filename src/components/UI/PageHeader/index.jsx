import React from "react";
import GradientText from "../GradientText";
import pattern from "../../../assets/images/pattern.svg";

const PageHeader = ({ text }) => {
  return (
    <div className="h-[60vh]">
      <div
        className="w-full h-[60vh] flex justify-center items-center bg-primary bg-no-repeat bg-[length:350%] sm:bg-[length:300%] md:bg-[length:200%] xl:bg-[length:110%] 2xl:bg-cover 2xl:bg-[100%_20%] overflow-hidden rounded-b-xl absolute left-0 top-0"
        style={{
          backgroundImage: `url(${pattern})`,
          // backgroundPosition: "100% 20%",
        }}
      >
        <div className="absolute -left-[30vh] -top-[30vh] h-[60vh] w-[60vh] bg-white/30 rounded-full blur-[200px]" />
        <div className="absolute -right-[30vh] -bottom-[30vh] h-[60vh] w-[60vh] bg-white/30 rounded-full blur-[200px]" />
        <div className="w-[1920px] flex justify-center items-center">
          <GradientText
            text={text}
            customStyle={
              "text-center text-big 2xl:text-bigger font-bold text-primary w-[90%] md:w-[50%]"
            }
            header
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
