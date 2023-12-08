import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import useWindowDimensions from "../../../hooks/screenDimentions";
import { MdOutlineWhatsapp } from "react-icons/md";
import Modal from "../../UI/Modal/Modal";
import GalleryModal from "../../UI/GalleryModal";
import MessageBox from "../../UI/Message";
const PageLayout = ({ children }) => {
  const { width } = useWindowDimensions();
  const [w, setW] = useState(width);

  useEffect(() => {
    if (width !== w) {
      window.location.reload();
    }
    setW(width);
  }, [width]);
  return (
    <div className="flex flex-col justify-center items-center relative">
      <MessageBox />
      <NavBar />
      <div className="min-h-screen w-full max-w-[1920px]">{children}</div>
      <Footer />
      <Modal />
      <GalleryModal />
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
