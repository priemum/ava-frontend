import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  hideFilterModal,
  selectFilterModalData,
  selectFilterModalState,
} from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";
export default function FilterModal() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const open = useSelector(selectFilterModalState);
  const data = useSelector(selectFilterModalData);
  const { i18n, t } = useTranslation();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(hideFilterModal());
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
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 justify-center items-center flex fixed inset-0 z-40 outline-none focus:outline-none w-full`}
      >
        <div
          ref={ref}
          className="rounded-xl shadow-xl relative flex flex-col z-50 outline-none focus:outline-none overflow-hidden bg-fifth/40 backdrop-blur-sm border-[1px] border-white/40 h-full max-h-[90vh] w-full max-w-[90vw] sm:max-w-sm"
        >
          <div
            onClick={() => {
              dispatch(hideFilterModal());
            }}
            className={`cursor-pointer font-bold self-center text-secondary hover:scale-125 hover:rotate-180 absolute ${
              i18n.language == "en" ? "right-5" : "left-5"
            }  top-2 sm:max-md:top-8 md:top-3 transition-all duration-300 z-30`}
          >
            <MdClose size={35} />
          </div>
          <div className="h-14 w-full bg-white flex justify-center items-center font-semibold text-small">
            {t("Filter")}
          </div>
          {data?.data}
        </div>
      </div>
      <div
        className={`${
          open ? "scale-100" : "scale-0"
        } opacity-20 fixed h-screen inset-0 z-0 bg-black`}
      ></div>
    </>
  );
}
