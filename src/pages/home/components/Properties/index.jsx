import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import propertyIcon from "../../../../assets/icons/property-icon.svg";
import PropertyCard from "../../../../components/UI/PropertyCard";
import Slider from "react-slick";
import { useGetActivePropertiesMutation } from "../../../../redux/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Loader from "../../../../components/UI/Loader";
const HomeProperties = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const [
    getActiveProperties,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useGetActivePropertiesMutation();
  useEffect(() => {
    getActiveProperties({
      page: 0,
      limit: 9,
    });
  }, []);
  return (
    <div className="mt-20 flex flex-col justify-center items-center px-[5%]">
      <div className="flex w-full">
        <div className="flex items-center self-start flex-1">
          <img src={propertyIcon} alt="property Icon" />
          <p className="text-small md:text-med font-bold">
            {t("HomePropertiesTitle")}
          </p>
        </div>
        {isSuccess && data.count > 4 && (
          <div className="bg-primary/10 rounded-md p-3 flex items-center self-center gap-x-4 max-lg:hidden">
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
        )}
      </div>
      {isLoading || isFetching ? (
        <div className="my-24 flex flex-col justify-center items-center relative">
          <Loader />
        </div>
      ) : isError ? (
        <div className="my-2 flex flex-col justify-center items-center relative">
          <p className="text-med font-bold">
            Somthing went wrong, Please reload the page!
          </p>
        </div>
      ) : isSuccess && data.count == 0 ? (
        <div className="my-2 flex flex-col justify-center items-center relative">
          <p className="text-med font-bold">There Are No Properties Yet!</p>
        </div>
      ) : (
        isSuccess &&
        data.count !== 0 && (
          <Slider
            ref={sliderRef}
            slidesToScroll={1}
            slidesToShow={data.ids.length >= 4 ? 4 : data.ids.length}
            arrows={false}
            dots={false}
            className="w-full"
            beforeChange={(prev, next) => setCurrentSlide(next)}
            responsive={[
              {
                breakpoint: 1200,
                settings: { slidesToShow: data.count >= 2 ? 2 : data.count },
              },
              {
                breakpoint: 700,
                settings: { slidesToShow: 1 },
              },
            ]}
          >
            {data.ids.map((item, index) => {
              return <PropertyCard key={index} data={data.entities[item]} />;
            })}
          </Slider>
        )
      )}
    </div>
  );
};

export default HomeProperties;
