import React from "react";
import backImage from "../../assets/images/home/330.webp";
import GradientText from "../../components/UI/GradientText";
import EnquiryForm from "./components/EnquiryForm";
import { useTranslation } from "react-i18next";
const EnquiryPage = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ backgroundImage: `url(${backImage})` }}
      className="w-full h-full min-h-screen bg-center bg-cover bg-no-repeat"
    >
      <div className="bg-primary/80 h-full min-h-screen flex flex-col justify-center items-center space-y-12 pt-32 pb-24">
        <GradientText
          text={t("EnquiryTitle")}
          customStyle={
            "text-med md:text-[60px] font-bold text-center drop-shadow-2xl w-4/5 md:w-3/5"
          }
        />
        <EnquiryForm />
      </div>
    </div>
  );
};

export default EnquiryPage;
