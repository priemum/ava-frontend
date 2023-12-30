import React, { useState } from "react";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
import LazyImage from "../../../UI/LazyImage";
import Button from "../../../UI/Button";
import { API_BASE_URL } from "../../../../constants";

import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const AnnouncementsSlider = () => {
  const { data: announcements, isSuccess: announcementsIsSuccess } =
    useGetActiveAnnouncementsQuery();
  const { i18n, t } = useTranslation();
  const [expandAnnouncement, setExpandAnnouncement] = useState(false);
  return (
    announcementsIsSuccess && (
      <Slider
        slidesToScroll={1}
        slidesToShow={announcements.count >= 4 ? 4 : announcements.count}
        dots={true}
        className="h-[80vh] md:h-[60vh] w-[90vw] overflow-hidden"
        responsive={[
          {
            breakpoint: 1920,
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
          if (announcements.entities[item].Type == "Normal")
            return (
              <div key={index} className="!flex !justify-center !items-center">
                <div
                  className={`relative rounded-md shadow-md drop-shadow-md h-full w-full sm:w-[500px] lg:w-[600px] max-w-[95%] overflow-hidden`}
                >
                  <LazyImage
                    src={API_BASE_URL + announcements.entities[item].Image.URL}
                    skelatonStyle={"h-[60vh] w-full"}
                    imgStyle={"h-[60vh] w-full object-cover object-center"}
                  />

                  <div
                    className={`absolute ${
                      expandAnnouncement ? "bottom-0" : "-bottom-[38vh]"
                    }  left-0 transition-all duration-500 bg-primary/40 backdrop-blur-[21px] h-[52vh] overflow-y-scroll w-full`}
                  >
                    <div
                      className="w-full h-[2vh] flex justify-center items-start"
                      onClick={() => setExpandAnnouncement(!expandAnnouncement)}
                    >
                      {expandAnnouncement ? (
                        <MdExpandMore className="text-med text-white" />
                      ) : (
                        <MdExpandLess className="text-med text-white" />
                      )}
                    </div>
                    <div className="space-y-2 p-4 flex flex-col h-[50vh]">
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
                      <Button
                        bgColor={"bg-buttonGrad"}
                        text={t("MoreDetails")}
                        textColor={"text-primary text-tiny md:text-smaller"}
                        customStyle={"p-4"}
                        w={"200px"}
                        h={"45px"}
                        borderRadius={4}
                        onClick={() => {
                          window.open(
                            announcements.entities[item].Link,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      />
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
