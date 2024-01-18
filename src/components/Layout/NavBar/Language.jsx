import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MdLanguage,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { useGetLNGQuery } from "../../../redux/languages/languagesSlice";
export default function Dropdown() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };
  const { data, isLoading, isFetching, isSuccess, isError } = useGetLNGQuery();
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
          className="text-purple p-0 m-0 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <MdLanguage size={30} className="text-white" />
        </div>

        <div
          ref={ref}
          onClick={() => setOpen(false)}
          className={`${open ? "scale-100" : "scale-0"} absolute z-10 top-10  ${
            data?.normalData.find((x) => x.Code.toLowerCase() == i18n.language)
              .Direction == "rtl"
              ? "-right-32 origin-top-left"
              : "-left-32 origin-top-right"
          }  bg-primary/20 rounded-lg shadow-2xl drop-shadow-2xl backdrop-blur-sm transition-all duration-300 p-4 space-y-2 text-white text-smaller w-40`}
        >
          {isLoading || isFetching ? (
            <div className="flex justify-start items-center">
              <p>{t("Loading")}</p>
            </div>
          ) : (
            data.ids.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-start items-center cursor-pointer"
                  onClick={() => {
                    changeLanguage(data.entities[item].Code.toLowerCase());
                  }}
                >
                  <div className="px-2">
                    {i18n.language ===
                    data.entities[item].Code.toLowerCase() ? (
                      <MdRadioButtonChecked size={24} />
                    ) : (
                      <MdRadioButtonUnchecked size={24} />
                    )}
                  </div>
                  <p className="font-semibold">{data.entities[item].Name}</p>
                </div>
              );
            })
          )}
          {/* <div
            className="flex justify-start items-center cursor-pointer"
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
            className="flex justify-start items-center cursor-pointer"
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
