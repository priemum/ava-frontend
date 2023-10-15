import React from "react";
import GradientText from "../../../../components/UI/GradientText";
const Header = () => {
  return (
    <div className="w-full h-[380px] md:h-[400px] xl:h-[500px] 2xl:h-[500px] flex justify-center items-center bg-headerBg bg-secondary bg-no-repeat bg-cover bg-center">
      <GradientText
        text={"Join Our Team"}
        customStyle={
          "text-center text-big 2xl:text-bigger font-bold text-primary w-[90%] md:w-[50%]"
        }
        header
      />
    </div>
  );
};

export default Header;
