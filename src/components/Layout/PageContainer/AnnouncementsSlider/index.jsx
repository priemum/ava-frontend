import React, { useState } from "react";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
import LazyImage from "../../../UI/LazyImage";
import Button from "../../../UI/Button";
import { API_BASE_URL } from "../../../../constants";
import colors from "../../../../settings";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const AnnouncementsSlider = () => {
  const { data: announcements, isSuccess: announcementsIsSuccess } =
    useGetActiveAnnouncementsQuery();
  const { i18n, t } = useTranslation();
  const [expandAnnouncement, setExpandAnnouncement] = useState();
  return (
    announcementsIsSuccess &&
    announcements.ids.length !== 0 && (
      <Slider
        slidesToScroll={1}
        slidesToShow={announcements.count >= 4 ? 4 : announcements.count}
        dots={true}
        className="h-[80vh] md:h-[60vh] w-[90vw] overflow-hidden"
        lazyLoad="ondemand"
        responsive={[
          {
            breakpoint: 2000,
            settings: {
              slidesToShow: announcements.count >= 3 ? 3 : announcements.count,
            },
          },
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: announcements.count >= 2 ? 2 : announcements.count,
            },
          },
          {
            breakpoint: 900,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {announcements.ids.map((item, index) => {
          if (announcements.entities[item].Type == "PopUp")
            return (
              <div key={index} className="!flex !justify-center !items-center">
                <div
                  className={`relative rounded-md shadow-md drop-shadow-md h-full w-full sm:w-[500px] lg:w-[600px] max-w-[95%] overflow-hidden`}
                >
                  <LazyImage
                    src={API_BASE_URL + announcements.entities[item].Image.URL}
                    skelatonStyle={"h-[60vh] w-full"}
                    imgStyle={"h-[60vh] w-full object-fit object-center"}
                  />
                  <Button
                    bgColor={"bg-primary/80"}
                    text={t("MoreDetails")}
                    textColor={"text-white text-tiny md:text-smaller"}
                    customStyle={
                      "p-4 absolute top-1 right-2 shadow-2xl drop-shadow-2xl animate-pulse hover:animate-none"
                    }
                    w={"180px"}
                    h={"45px"}
                    borderRadius={4}
                    borderColor={colors.secondary}
                    onClick={() => {
                      window.open(
                        announcements.entities[item].Link,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  />
                  <div
                    className={`absolute ${
                      expandAnnouncement == item
                        ? "bottom-0"
                        : "-bottom-[calc(50vh-1rem)]"
                    }  left-0 transition-all duration-500 bg-primary/80 h-[53vh] overflow-y-auto w-full flex flex-col space-y-2 px-4 pb-4 pt-2`}
                  >
                    <div
                      className="w-1/2 self-center h-[3vh] flex justify-center items-start cursor-pointer bg-secondary rounded-full shadow-md drop-shadow-md"
                      onClick={() => {
                        setExpandAnnouncement(
                          expandAnnouncement == item ? "" : item
                        );
                      }}
                    >
                      {expandAnnouncement == item ? (
                        <MdExpandMore className="text-[3vh] text-primary scale-150" />
                      ) : (
                        <MdExpandLess className="text-[3vh] text-primary scale-150" />
                      )}
                    </div>
                    <div className="">
                      {/* <p className="text-tiny underline text-white h-[3vh]">
                        {t("MoreDetails")}
                      </p> */}
                      <p className="text-white font-semibold text-smaller sm:text-small h-[10vh]">
                        {
                          announcements.entities[
                            item
                          ].Announcements_Translation.find(
                            (x) =>
                              x.Language.Code.toLowerCase() ==
                              i18n.language.toLowerCase()
                          ).Title
                        }
                      </p>

                      <p className="text-white text-tiny md:text-smaller flex-1">
                        {
                          announcements.entities[
                            item
                          ].Announcements_Translation.find(
                            (x) =>
                              x.Language.Code.toLowerCase() ==
                              i18n.language.toLowerCase()
                          ).Description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </Slider>
    )
  );
};

export default AnnouncementsSlider;
