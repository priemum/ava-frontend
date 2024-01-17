import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import useWindowDimensions from "../../../hooks/screenDimentions";
import { MdOutlineWhatsapp } from "react-icons/md";
import Modal from "../../UI/Modal/Modal";
import GalleryModal from "../../UI/GalleryModal";
import AnnouncementsModal from "../../UI/AnnouncementsModal";
import MessageBox from "../../UI/Message";
import SettingsModal from "../NavBar/SettingsModal";
import { useGetLNGQuery } from "../../../redux/languages/languagesSlice";
import { showAnnouncementModal } from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import AnnouncementsSlider from "./AnnouncementsSlider";
import { useGetActiveAnnouncementsQuery } from "../../../redux/announcements/announcementsSlice";
const PageLayout = ({ children }) => {
  const { width } = useWindowDimensions();
  const { i18n, t } = useTranslation();
  const [w, setW] = useState(width);
  const dispatch = useDispatch();
  useEffect(() => {
    if (width !== w) {
      window.location.reload();
    }
    setW(width);
  }, [width]);
  const { data, isSuccess } = useGetLNGQuery();
  const { data: announcements, isSuccess: announcementIsSuccess } =
    useGetActiveAnnouncementsQuery();

  const showAnnouncement = (initialSlide) => {
    dispatch(
      showAnnouncementModal({
        data: <AnnouncementsSlider />,
      })
    );
  };
  useEffect(() => {
    if (announcementIsSuccess && announcements?.PopUp.length !== 0)
      setTimeout(() => {
        showAnnouncement();
      }, 100);
  }, [announcementIsSuccess]);
  return (
    <div
      className="flex flex-col justify-center items-center relative"
      dir={
        isSuccess
          ? data.normalData.find((x) => x.Code.toLowerCase() == i18n.language)
              .Direction
          : "ltr"
      }
    >
      <MessageBox />
      <NavBar />
      <div className="min-h-screen w-full max-w-[1920px]">{children}</div>
      <Footer />
      <Modal />
      <GalleryModal />
      <SettingsModal />
      <AnnouncementsModal />
      <div
        className="fixed bottom-3 md:bottom-5 right-3 md:right-5 bg-[#25D366]/80 text-white p-3 rounded-full cursor-pointer z-40"
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `https://wa.me/+971501108606`,
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        <MdOutlineWhatsapp className="text-[30px] md:text-[40px]" />
      </div>
    </div>
  );
};

export default PageLayout;
