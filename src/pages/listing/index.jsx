import React from "react";
import backImage from "../../assets/images/home/southTH.webp";
import GradientText from "../../components/UI/GradientText";
import ListingForm from "./components/ListingForm";
const ListingPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${backImage})` }}
      className="w-full h-full min-h-screen bg-center bg-cover bg-no-repeat"
    >
      <div className="bg-primary/70 h-full min-h-screen py-24 flex flex-col justify-center items-center space-y-12">
        <GradientText
          text={"Share Your Apartment For Sale/Rent With Us"}
          customStyle={
            "text-med md:text-[60px] font-bold text-center drop-shadow-2xl w-3/5 "
          }
        />
        <div className=" w-full flex max-md:flex-col max-md:justify-center md:justify-center items-start md:gap-x-8 max-md:space-y-8">
          <ListingForm />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
