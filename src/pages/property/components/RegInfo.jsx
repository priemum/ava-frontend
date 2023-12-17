import React from "react";
import { useTranslation } from "react-i18next";

const RegInfo = ({ data, currentSlide }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 space-y-3">
      <p className="text-smaller font-bold"> {t("RegulatoryInformation")}</p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("PermitNumber")} </span>
        {data.propertyUnits[currentSlide].PermitNumber}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("DEDNo")}: </span>
        {data.propertyUnits[currentSlide].DEDNo}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("ReraNo")}: </span>
        {data.ReraNo}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("BRNNo")}: </span>
        {"52615"}
      </p>
    </div>
  );
};

export default RegInfo;
