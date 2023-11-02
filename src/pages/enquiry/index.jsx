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
      <div className="bg-primary/80 h-full min-h-screen py-24 flex flex-col justify-center items-center space-y-12">
        <GradientText
          text={"Make A Request For The Apartment You Desire"}
          customStyle={
            "text-med md:text-[60px] font-bold text-center drop-shadow-2xl w-3/5"
          }
        />
        <div className=" w-full flex max-md:flex-col max-md:justify-center md:justify-center items-center md:gap-x-8">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
