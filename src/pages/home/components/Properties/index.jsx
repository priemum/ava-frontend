import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import propertyIcon from "../../../../assets/icons/property-icon.svg";
import PropertyCard from "../../../../components/UI/PropertyCard";
import Slider from "react-slick";
import { useGetActivePropertiesQuery } from "../../../../redux/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
const HomeProperties = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActivePropertiesQuery();
  return (
    <div className="mt-20 flex flex-col justify-center items-center px-[5%]">
      <div className="flex w-full">
        <div className="flex items-center self-start flex-1">
          <img src={propertyIcon} alt="property Icon" />
          <p className="text-med font-bold">{t("HomePropertiesTitle")}</p>
        </div>
        <div className="bg-primary/10 rounded-md p-3 flex items-center self-center gap-x-4">
          <FaAngleLeft
            onClick={() => {
              sliderRef.current.slickGoTo(currentSlide - 1);
            }}
            size={24}
            className="cursor-pointer"
          />
          <div className="w-px h-6 bg-primary/30" />
          <FaAngleRight
            onClick={() => {
              sliderRef.current.slickGoTo(currentSlide + 1);
            }}
            size={24}
            className="cursor-pointer"
          />
        </div>
      </div>
      {isSuccess && !isFetching && !isLoading && (
        <Slider
          ref={sliderRef}
          slidesToScroll={1}
          slidesToShow={data.ids.length >= 4 ? 4 : data.ids.length}
          arrows={false}
          dots={false}
          className="w-full"
          beforeChange={(prev, next) => setCurrentSlide(next)}
        >
          {data.ids.map((item, index) => {
            return <PropertyCard key={index} data={data.entities[item]} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default HomeProperties;
