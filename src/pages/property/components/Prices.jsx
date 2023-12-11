import React from "react";
import { useTranslation } from "react-i18next";
import { numberWithComma } from "../../../helpers/numberComma";
import { useSelector } from "react-redux";
import {
  selectCurrentCurrency,
  selectCurrentUnit,
} from "../../../redux/websiteSettings.slice";
import { FaCoins } from "react-icons/fa";
const Prices = ({ data, currentSlide }) => {
  const { i18n, t } = useTranslation();
  const currentCurrency = useSelector(selectCurrentCurrency);
  const currentUnit = useSelector(selectCurrentUnit);
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 space-y-3">
      <p className="text-[#878787]"> {t("PriceOfUnit")} </p>
      <div className="text-primary text-med flex items-center gap-x-3">
        <FaCoins size={24} />
        {numberWithComma(
          data.propertyUnits[currentSlide].Price *
            currentCurrency.conversionRate
        )}
      </div>
      <p className="text-[#878787]">{t("PricePerSQFT")}</p>
      <div className="text-primary text-med flex items-center gap-x-3">
        <FaCoins size={24} />
        {numberWithComma(
          (data.propertyUnits[currentSlide].Price *
            currentCurrency.conversionRate) /
            (data.propertyUnits[currentSlide].Size * currentUnit.conversionRate)
        )}
      </div>
    </div>
  );
};

export default Prices;
