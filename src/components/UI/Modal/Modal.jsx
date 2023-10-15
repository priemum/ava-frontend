import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  selectModalData,
  selectState,
} from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";

export default function Modal() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const open = useSelector(selectState);
  const data = useSelector(selectModalData);
  const { i18n } = useTranslation();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(hideModal());
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <div
        className={`${
          open ? "scale-100" : "scale-0"
        } transition-all duration-500 justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none w-full`}
      >
        <div
          ref={ref}
          className="rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none overflow-x-hidden overflow-y-scroll max-h-screen max-w-[95%] xl:max-w-[60%]"
        >
          <div
            onClick={() => {
              dispatch(hideModal());
            }}
            className={`cursor-pointer font-bold self-center text-black hover:scale-125 hover:rotate-180 absolute ${
              i18n.language == "en" ? "right-5" : "left-5"
            }  top-2 sm:max-md:top-8 md:top-3 transition-all duration-300 z-30`}
          >
            <MdClose className="text-bigger sm:text-huge" />
          </div>
          {/* <Register modal={true} /> */}
          {data?.data}
        </div>
      </div>
      <div
        className={`${
          open ? "scale-100" : "scale-0"
        } opacity-20 fixed h-screen inset-0 z-40 bg-black`}
      ></div>
    </>
  );
}
