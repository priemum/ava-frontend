import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  MdLanguage,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
export default function Dropdown() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="rounded-md">
      <div className="relative">
        <div
          style={{ WebkitTapHighlightColor: "transparent" }}
          className="text-purple p-0 m-0 px-8 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <MdLanguage size={24} />
        </div>

        <div
          ref={ref}
          onClick={() => setOpen(false)}
          className={`${
            open ? "scale-100" : "scale-0"
          } absolute z-10 mt-4 origin-top bg-purple rounded-lg shadow-2xl transition-all duration-300 p-4 space-y-2 text-white font-MED text-smaller w-40`}
        >
          <div
            className="flex justify-start items-center"
            onClick={() => {
              changeLanguage("en");
            }}
          >
            <div className="px-2">
              {i18n.language === "en" ? (
                <MdRadioButtonChecked size={24} />
              ) : (
                <MdRadioButtonUnchecked size={24} />
              )}
            </div>
            <p>{t("English")}</p>
          </div>

          <div
            className="flex justify-start items-center"
            onClick={() => {
              changeLanguage("ar");
            }}
          >
            <div className="px-2">
              {i18n.language === "ar" ? (
                <MdRadioButtonChecked size={24} />
              ) : (
                <MdRadioButtonUnchecked size={24} />
              )}
            </div>
            <p>{t("Arabic")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
