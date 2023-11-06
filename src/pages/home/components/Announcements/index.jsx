import React, { useState, useEffect, useRef } from "react";
import colors from "../../../../settings";
import Button from "../../../../components/UI/Button";
import testIMG from "../../../../assets/images/home/amber.webp";
import Slider from "react-slick";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
import { API_BASE_URL } from "../../../../constants";
import { useTranslation } from "react-i18next";
import LazyImage from "../../../../components/UI/LazyImage";
import Loader from "../../../../components/UI/Loader";
const Announcements = () => {
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetActiveAnnouncementsQuery();
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const compRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (compRef.current.getBoundingClientRect().top > 190)
        setScrollY(compRef.current.getBoundingClientRect().top);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const { i18n } = useTranslation();
  return isLoading || isFetching ? (
    <div className="my-24 flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="my-24 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">
        Somthing went wrong, Please reload the page!
      </p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div ref={compRef} className="mt-24 px-[5%] overflow-hidden">
        <div
          style={{
            background: `linear-gradient(279deg, ${colors.secondary} -33.22%, ${colors.primary} 41.05%)`,
          }}
          className="rounded-md relative"
        >
          {data.count > 1 && (
            <div className="absolute h-9 flex justify-center items-center left-12 bottom-12 gap-x-8">
              {data.ids.map((item, index) => {
                return (
                  <div
                    className={`${
                      currentSlide == index
                        ? "border-white/80"
                        : "border-transparent"
                    } transition-all duration-500 z-30 border-[2px] rounded-full p-px`}
                  >
                    <div
                      onClick={() => sliderRef.current.slickGoTo(index)}
                      key={item}
                      className={`w-7 h-7 rounded-full bg-white/50 backdrop-blur-[21px] cursor-pointer transition-all duration-500`}
                    />
                  </div>
                );
              })}
              <div className="w-[80%] h-1 bg-white/50 absolute z-0" />
            </div>
          )}
          <Slider
            ref={sliderRef}
            slidesToScroll={1}
            slidesToShow={1}
            arrows={false}
            className="!w-full !h-[600px]"
            beforeChange={(prev, next) => {
              setCurrentSlide(next);
            }}
          >
            {data.ids.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[600px] !grid !grid-cols-2"
                >
                  <div className="p-8 xl:px-12 2xl:px-16 space-y-7 flex flex-col justify-center items-start h-full w-full">
                    <p className="text-white font-bold text-big ">
                      {
                        data.entities[item].Announcements_Translation.find(
                          (x) =>
                            x.Language.Code.toLowerCase() ==
                            i18n.language.toLowerCase()
                        ).Title
                      }
                    </p>
                    <p className="text-white font-medium text-small">
                      {
                        data.entities[item].Announcements_Translation.find(
                          (x) =>
                            x.Language.Code.toLowerCase() ==
                            i18n.language.toLowerCase()
                        ).Description
                      }
                    </p>
                    <Button
                      bgColor={"bg-buttonGrad"}
                      text={"More Details"}
                      textColor={"text-primary text-tiny"}
                      customStyle={"p-4"}
                      w={"200px"}
                      h={"45px"}
                      borderRadius={4}
                    />
                  </div>
                  <div className="h-full w-full relative">
                    <div
                      className={`h-[450px] w-[600px] absolute top-1/2 left-1/2 p-1 bg-white origin-bottom-left rounded-md ease-out duration-500  transition-all ${
                        index == currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        rotate: -scrollY / 50 + "deg",
                        transform: "translate(" + -scrollY * 0.2 + "%, -50%)",
                      }}
                    >
                      <LazyImage
                        src={API_BASE_URL + data.entities[item].Image.URL}
                        // src={testIMG}
                        alt="Announcement Image"
                        divStyle={`h-full w-full rounded-md`}
                        imgStyle={
                          "h-full w-full object-center object-cover rounded-md"
                        }
                        skelatonStyle={"h-full w-full rounded-md"}
                        className="h-full w-full object-center object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    )
  );
};

export default Announcements;
