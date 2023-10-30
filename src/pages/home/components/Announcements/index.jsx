import React, { useState, useEffect, useRef } from "react";
import colors from "../../../../settings";
import Button from "../../../../components/UI/Button";
import testIMG from "../../../../assets/images/home/amber.webp";
import Slider from "react-slick";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
import { API_BASE_URL } from "../../../../constants";
import { useTranslation } from "react-i18next";
const Announcements = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveAnnouncementsQuery();
  const [scrollY, setScrollY] = useState(0);
  const compRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (compRef.current.getBoundingClientRect().top > 170)
        setScrollY(compRef.current.getBoundingClientRect().top);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const { i18n } = useTranslation();
  return (
    isSuccess &&
    !isLoading &&
    !isFetching &&
    data.count !== 0 && (
      <div ref={compRef} className="mt-24 px-[5%] overflow-hidden">
        <div
          style={{
            background: `linear-gradient(279deg, ${colors.secondary} -33.22%, ${colors.primary} 41.05%)`,
          }}
          className="rounded-md"
        >
          <Slider
            slidesToScroll={1}
            slidesToShow={1}
            arrows={false}
            className="!w-full !h-[600px]"
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
                      className={`h-[450px] w-[600px] absolute top-1/2 left-1/2 p-1 bg-white origin-bottom-left rounded-md ease-out duration-500  transition-all`}
                      style={{
                        rotate: -scrollY / 50 + "deg",
                        transform: "translate(" + -scrollY * 0.3 + "%, -50%)",
                      }}
                    >
                      <img
                        src={API_BASE_URL + data.entities[item].Image.URL}
                        // src={testIMG}
                        alt="Announcement Image"
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
