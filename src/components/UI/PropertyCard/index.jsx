import React, { useState } from "react";
import { API_BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { MdArrowOutward, MdInfoOutline } from "react-icons/md";
import { FaCoins, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import bath from "../../../assets/icons/bath.svg";
import bedroom from "../../../assets/icons/bedroom.svg";
import squareft from "../../../assets/icons/squareft.svg";
function SampleNextArrow({ onClick }) {
  return (
    <div
      className="absolute cursor-pointer z-10 right-3 top-[45%] rounded-full bg-primary/20 backdrop-blur-[21px]"
      onClick={onClick}
    >
      <FaAngleRight className="text-white" size={35} />
    </div>
  );
}
function SamplePrevArrow({ onClick }) {
  return (
    <div
      className="absolute cursor-pointer z-10 left-3 top-[45%] rounded-full bg-primary/20 backdrop-blur-[21px]"
      onClick={onClick}
    >
      <FaAngleLeft className="text-white" size={35} />
    </div>
  );
}
const PropertyCard = ({ data }) => {
  const { i18n } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`h-[550px] w-[95%] relative overflow-hidden rounded-md group shadow-lg drop-shadow-md`}
      >
        <Slider
          slidesToScroll={1}
          slidesToShow={1}
          dots={true}
          arrows={true}
          className="!h-[550px] w-full"
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {data.Images.map((item, index) => {
            return (
              <img
                key={index}
                src={API_BASE_URL + item.URL}
                alt={`${
                  data?.Property_Translation?.find(
                    (x) => x.Language.Code == i18n.language
                  )?.Name + index
                }`}
                className="h-[550px] w-full object-cover object-center"
              />
            );
          })}
        </Slider>
        <div
          className={`absolute ${
            showDetails ? "bottom-0" : "-bottom-[110px]"
          } left-0 w-full h-1/2 z-20 bg-primary/20 backdrop-blur-[21px] text-white p-4 transition-all duration-500`}
        >
          <div className="flex items-center justify-between -mt-10 h-1/5 overflow-hidden">
            <div className="bg-secondary min-w-[200px] p-2 rounded-md text-black text-smaller flex items-center gap-x-3">
              <FaCoins size={20} />
              {data.Price}
            </div>
            <div
              className="bg-third p-2 rounded-md text-black text-smaller cursor-pointer"
              onClick={() => {
                // setShowDetails(!showDetails);
              }}
            >
              <MdArrowOutward size={24} />
            </div>
          </div>
          <div className="h-3/5 flex justify-start items-center">
            <p className="text-small font-bold mt-3">
              {
                data.Property_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                )?.Name
              }
            </p>
          </div>
          <div className="pb-2 pt-5 flex justify-evenly items-center font-bold text-smaller h-2/5">
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-2 items-center">
                <p>{data.Bathrooms ?? 0} </p>
                <img src={bath} className="w-8 h-8" alt="bath-icon" />
              </div>
              <p className="font-normal text-[12px] md:text-tiny">Baths</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-2 items-center">
                <p>{data.Bedrooms ?? 0} </p>
                <img src={bedroom} className="w-8 h-8" alt="bedroom-icon" />
              </div>
              <p className="font-normal text-[12px] md:text-tiny">Bedrooms</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-2 items-center">
                <p className="text-tiny lg:text-smaller">{data.Area ?? 0}</p>
                <img src={squareft} className="w-8 h-8" alt="area-icon" />
              </div>
              <p className="font-normal text-[12px] md:text-tiny">
                Square (Ft)
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-[10%] px-4 pt-5 flex items-center text-white gap-x-4">
          <div className="bg-primary/30 backdrop-blur-[21px] p-2 rounded-md shadow-md">
            {data.Purpose}
          </div>
          <div className="bg-primary/30 backdrop-blur-[21px] p-2 rounded-md shadow-md">
            {
              data.Category.Category_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Name
            }
          </div>
          <div
            className="bg-buttonGrad rounded-md p-1 cursor-pointer flex items-center gap-x-2 shadow-md absolute right-4"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            <MdInfoOutline size={30} className="text-primary" />
            {/* <p className="text-primary font-semibold">Info</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
