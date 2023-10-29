import React from "react";
import backImage from "../../assets/images/home/330.webp";
import GradientText from "../../components/UI/GradientText";
import EnquiryForm from "./components/EnquiryForm";
const EnquiryPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${backImage})` }}
      className="w-full h-full min-h-screen bg-center bg-cover bg-no-repeat"
    >
      <div className="bg-primary/70 h-full min-h-screen py-24 flex flex-col justify-center items-center space-y-12">
        <GradientText
          text={"Show your apartment for sale or rent with us"}
          customStyle={
            "text-bigger font-bold text-center drop-shadow-2xl w-3/5"
          }
        />
        <div className="bg-fourth/40 rounded-md shadow-lg backdrop-blur-[21px] p-8 border-[1px] border-t-white/70 border-l-white/70 border-white/40">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
