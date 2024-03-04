import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import propertyIcon from "../../../../assets/icons/property-icon.svg";
import PropertyCard from "../../../../components/UI/PropertyCard";
import Slider from "react-slick";
import { useGetActivePropertiesQuery } from "../../../../redux/properties/propertiesSlice";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Loader from "../../../../components/UI/Loader";
import { useGetLNGQuery } from "../../../../redux/languages/languagesSlice";
const HomeProperties = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetActivePropertiesQuery({
      page: 0,
      limit: 9,
    });
  const { data: lngData, isSuccess: lngIsSuccess } = useGetLNGQuery();
  return (
    <div className="mt-10 flex flex-col justify-center items-center px-[5%]">
      <div className="flex w-full">
        <div className="flex items-center self-start flex-1">
          <img src={propertyIcon} alt="property Icon" />
          <p className="text-small md:text-med font-bold">
            {t("HomePropertiesTitle")}
          </p>
        </div>
        {isSuccess && data.count > 4 && (
          <div
            className="bg-primary/10 rounded-md p-3 flex items-center self-center gap-x-4 max-lg:hidden"
            dir="ltr"
          >
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
          <p className="text-med font-bold">{t("ErrorPleaseReload")}</p>
        </div>
      ) : isSuccess && data.count == 0 ? (
        <div className="my-2 flex flex-col justify-center items-center relative">
          <p className="text-med font-bold">{t("NoProperties")}</p>
        </div>
      ) : (
        isSuccess &&
        data.count !== 0 && (
          <Slider
            ref={sliderRef}
            slidesToScroll={1}
            lazyLoad="progressive"
            slidesToShow={data.ids.length >= 4 ? 4 : data.ids.length}
            arrows={false}
            dots={false}
            className="w-full"
            autoplay
            autoplaySpeed={3000}
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
              return (
                <div
                  className="!w-[95%]"
                  dir={
                    lngData?.normalData.find(
                      (x) => x.Code.toLowerCase() == i18n.language
                    ).Direction
                  }
                >
                  <PropertyCard key={index} data={data.entities[item]} />
                </div>
              );
            })}
          </Slider>
        )
      )}
    </div>
  );
};

export default HomeProperties;
