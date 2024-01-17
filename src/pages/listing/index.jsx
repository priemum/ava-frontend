import React from "react";
import backImage from "../../assets/images/home/southTH.webp";
import GradientText from "../../components/UI/GradientText";
import ListingForm from "./components/ListingForm";
import { useTranslation } from "react-i18next";
const ListingPage = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ backgroundImage: `url(${backImage})` }}
      className="w-full h-full min-h-screen bg-center bg-cover bg-no-repeat"
    >
      <div className="bg-primary/70 h-full min-h-screen flex flex-col justify-center items-center space-y-12 pt-32 pb-24">
        <GradientText
          text={t("ListingTitle")}
          customStyle={
            "text-med md:text-[60px] font-bold text-center drop-shadow-2xl w-4/5 md:w-3/5 "
          }
        />
        <div className="w-full flex max-lg:flex-col justify-center items-center gap-8">
          <ListingForm />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
