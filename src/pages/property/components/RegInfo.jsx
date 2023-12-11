import React from "react";
import { useTranslation } from "react-i18next";

const RegInfo = ({ data, currentSlide }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 space-y-3">
      <p className="text-smaller font-bold"> {t("Regulatory Information")}</p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("Permit Number:")} </span>
        {data.propertyUnits[currentSlide].PermitNumber}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("DED No:")} </span>
        {data.propertyUnits[currentSlide].DEDNo}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("Rera No:")} </span>
        {data.ReraNo}
      </p>
      <p className="font-semibold">
        <span className="text-[#6A6A6A]">{t("BRN No:")} </span>
        {"52615"}
      </p>
    </div>
  );
};

export default RegInfo;
