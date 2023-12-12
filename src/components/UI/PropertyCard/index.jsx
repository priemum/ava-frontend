import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { MdArrowOutward, MdInfoOutline } from "react-icons/md";
import { FaCoins, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import bath from "../../../assets/icons/bath.svg";
import bedroom from "../../../assets/icons/bedroom.svg";
import squareft from "../../../assets/icons/squareft.svg";
import LazyImage from "../LazyImage";
import { useNavigate } from "react-router-dom";
import { numberWithComma } from "../../../helpers/numberComma";
import { useSelector } from "react-redux";
import {
  selectCurrentCurrency,
  selectCurrentUnit,
} from "../../../redux/websiteSettings.slice";
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
  const navigate = useNavigate();
  const currentUnit = useSelector(selectCurrentUnit);
  const currentCurrency = useSelector(selectCurrentCurrency);
  const [showDetails, setShowDetails] = useState(false);
  const [priceSymbol, setPriceSymbol] = useState(
    currentCurrency.Currency_Translation.find(
      (x) => x.Language.Code.toLowerCase() == i18n.language
    ).Symbol
  );

  const [lower, setLower] = useState({});
  const [higher, setHigher] = useState({});
  useEffect(() => {
    let low = data.propertyUnits.reduce((acc, loc) =>
      acc.Size < loc.Size ? acc : loc
    );
    let high = data.propertyUnits.reduce((acc, loc) =>
      acc.Size > loc.Size ? acc : loc
    );
    setLower(low);
    setHigher(high);
  }, [data]);

  useEffect(() => {
    setPriceSymbol(
      currentCurrency.Currency_Translation.find(
        (x) => x.Language.Code.toLowerCase() == i18n.language
      ).Symbol ?? ""
    );
  }, [currentCurrency]);

  return (
    Object.keys(lower).length !== 0 &&
    Object.keys(higher).length !== 0 && (
      <div className="flex flex-col items-center justify-center">
        <div
          className={`h-[550px] w-[95%] relative overflow-hidden rounded-md group shadow-lg drop-shadow-md`}
        >
          <Slider
            slidesToScroll={1}
            slidesToShow={1}
            dots={false}
            arrows={true}
            className="!h-[550px] w-full"
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {data.Images.map((item, index) => {
              return (
                <LazyImage
                  key={index}
                  src={API_BASE_URL + item.URL}
                  alt={`${
                    data?.Property_Translation?.find(
                      (x) => x.Language.Code == i18n.language
                    )?.Name + index
                  }`}
                  divStyle={"h-[550px] w-full"}
                  imgStyle={"h-[550px] w-full object-cover object-center"}
                  skelatonStyle={"h-[550px] w-full"}
                  className="h-[550px] w-full object-cover object-center"
                />
              );
            })}
          </Slider>
          <div
            className={`absolute ${
              showDetails ? "bottom-0" : "-bottom-[110px]"
            } left-0 w-full h-1/2 z-20 bg-primary/40 backdrop-blur-[21px] text-white p-4 transition-all duration-500`}
          >
            <div className="flex items-center justify-between -mt-10 h-1/5 overflow-hidden">
              <div className="bg-secondary min-w-[150px] p-2 rounded-md text-black text-smaller flex items-center gap-x-3">
                <FaCoins size={20} />
                {lower.Price == higher.Price
                  ? numberWithComma(
                      lower.Price * currentCurrency.conversionRate
                    ) + ` ${priceSymbol}`
                  : numberWithComma(
                      lower.Price * currentCurrency.conversionRate
                    ) +
                    ` ${priceSymbol}` +
                    " - " +
                    numberWithComma(
                      higher.Price * currentCurrency.conversionRate
                    ) +
                    ` ${priceSymbol}`}
              </div>
              <div
                className="bg-third p-2 rounded-md text-black text-smaller cursor-pointer"
                onClick={() => {
                  navigate(`/property/${data.id}`);
                  sessionStorage.setItem("propertyId", data.id);
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
                      x.Language.Code.toLowerCase() ==
                      i18n.language.toLowerCase()
                  )?.Name
                }
              </p>
            </div>
            <div className="pb-2 pt-5 flex justify-evenly items-center font-bold text-smaller h-2/5">
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="text-tiny md:text-smaller">
                    {lower.Bathrooms == higher.Bathrooms
                      ? lower.Bathrooms
                      : lower.Bathrooms + " - " + higher.Bathrooms}
                  </p>
                  <img
                    src={bath}
                    className="w-6 h-6 md:w-8 md:h-8"
                    alt="bath-icon"
                  />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">Baths</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="text-tiny md:text-smaller">
                    {lower.Bedrooms == higher.Bedrooms
                      ? lower.Bedrooms
                      : lower.Bedrooms + " - " + higher.Bedrooms}
                  </p>
                  <img
                    src={bedroom}
                    className="w-6 h-6 md:w-8 md:h-8"
                    alt="bedroom-icon"
                  />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">Bedrooms</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="text-tiny lg:text-smaller">
                    {lower.Size == higher.Size
                      ? numberWithComma(lower.Size * currentUnit.conversionRate)
                      : numberWithComma(
                          lower.Size * currentUnit.conversionRate
                        ) +
                        " - " +
                        numberWithComma(
                          higher.Size * currentUnit.conversionRate
                        )}
                  </p>
                  <img
                    src={squareft}
                    className="w-6 h-6 md:w-8 md:h-8"
                    alt="area-icon"
                  />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">
                  {
                    currentUnit.Unit_Translation.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    ).Name
                  }
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
    )
  );
};

export default PropertyCard;
