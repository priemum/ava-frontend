import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  hideGalleryModal,
  selectGalleryModalData,
  selectGalleryModalState,
} from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";
export default function Modal() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const open = useSelector(selectGalleryModalState);
  const data = useSelector(selectGalleryModalData);
  const { i18n } = useTranslation();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(hideGalleryModal());
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div
      className={`${
        open ? "scale-100" : "scale-0"
      } transition-all duration-500 justify-center items-center flex fixed inset-0 z-40 outline-none focus:outline-none w-full bg-primary/50 backdrop-blur-[21px]`}
    >
      <div
        ref={ref}
        className="relative flex justify-center items-center z-50 outline-none focus:outline-none overflow-hidden h-[80vh] w-[90vw]"
      >
        <div
          onClick={() => {
            dispatch(hideGalleryModal());
          }}
          className={`cursor-pointer font-bold self-center text-white hover:scale-125 hover:rotate-180 absolute ${
            i18n.language == "en" ? "right-5" : "left-5"
          }  top-2 sm:max-md:top-8 md:top-3 transition-all duration-500 z-30 backdrop-blur-[200px] rounded-full shadow-2xl drop-shadow-2xl`}
        >
          <MdClose size={50} className="text-primary" />
        </div>
        {data?.data}
      </div>
    </div>
  );
}
