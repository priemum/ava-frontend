import React, { useRef } from "react";
import bath from "../../../assets/icons/bath.svg";
import bedroom from "../../../assets/icons/bedroom.svg";
import squareft from "../../../assets/icons/squareft.svg";
import Slider from "react-slick";
import { numberWithComma } from "../../../helpers/numberComma";
import { useSelector } from "react-redux";
import { selectCurrentUnit } from "../../../redux/websiteSettings.slice";
import { useTranslation } from "react-i18next";
const UnitSlider = ({ data, currentSlide, setCurrentSlide }) => {
  const sliderRef = useRef();
  const currentUnit = useSelector(selectCurrentUnit);
  const { i18n, t } = useTranslation();
  return (
    <div className="mt-6 p-4 lg:p-8 bg-white rounded-xl w-[95%] md:w-[80%] shadow-xl overflow-hidden flex flex-col items-center justify-center">
      <Slider
        dots={false}
        arrows={true}
        infinite={false}
        slidesToShow={data.length ?? 2}
        slidesToScroll={1}
        className={`overflow-hidden h-full w-full max-md:max-w-[300px] md:max-lg:w-[500px] ${
          data.length < 2 && "hidden"
        }`}
        initialSlide={currentSlide}
      >
        {data.map((item, index) => {
          return (
            <div
              dir="ltr"
              key={index}
              className={`max-w-[95%] w-full py-1 px-2 text-center font-semibold ${
                currentSlide == index
                  ? "bg-secondary text-primary"
                  : "bg-primary/50 text-white shadow-2xl"
              } cursor-pointer transition-all duration-500 text-black rounded-md`}
              onClick={() => {
                sliderRef.current.slickGoTo(index);
                setCurrentSlide(index);
              }}
            >
              {item.Bedrooms == 0
                ? "std"
                : item.Bedrooms + "  " + t("Bedrooms")}
            </div>
          );
        })}
      </Slider>
      <Slider
        ref={sliderRef}
        dots={false}
        touchMove={false}
        swipe={false}
        arrows={false}
        initialSlide={currentSlide}
        infinite={false}
        className="h-full w-full max-md:max-w-[300px] md:max-lg:w-[500px] mt-6"
        beforeChange={(prev, next) => setCurrentSlide(next)}
      >
        {data.map((item, index) => {
          return (
            <div className="p-6 !grid !grid-cols-3 !w-[95%]" key={index}>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">{item.Bathrooms}</p>
                  <img src={bath} className="w-6 h-6" alt="bath-icon" />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">
                  {t("Bathrooms")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">{item.Bedrooms}</p>
                  <img src={bedroom} className="w-6 h-6" alt="bedroom-icon" />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">
                  {t("Bedrooms")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">
                    {numberWithComma(item.Size * currentUnit.conversionRate)}
                  </p>
                  <img src={squareft} className="w-6 h-6" alt="area-icon" />
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
          );
        })}
      </Slider>
    </div>
  );
};

export default UnitSlider;
