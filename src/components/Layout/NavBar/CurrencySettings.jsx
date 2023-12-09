import React from "react";
import { useGetActiveCurrencyQuery } from "../../../redux/currencies/currenciesSlice";
import { useTranslation } from "react-i18next";
import CustomInput from "../../Forms/CustomInput";
import { MdExpandMore } from "react-icons/md";
import {
  setCurrencyCR,
  selectCurrentCurrency,
} from "../../../redux/websiteSettings.slice";
import { useDispatch, useSelector } from "react-redux";
const CurrencySettings = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentCurrency = useSelector(selectCurrentCurrency);
  const {
    data: currencies,
    isLoading: currenciesIsLoading,
    isFetching: currenciesIsFetching,
    isSuccess: currenciesIsSuccess,
    isError: currenciesIsError,
  } = useGetActiveCurrencyQuery();

  return currenciesIsLoading || currenciesIsFetching ? (
    <div className="flex justify-center items-center h-full">
      <p className="text-smaller"> {t("Loading")} </p>
    </div>
  ) : currenciesIsError ? (
    <div className="flex justify-center items-center h-full">
      <p className="text-smaller"> {t("IsErrorMessage")} </p>
    </div>
  ) : (
    currenciesIsSuccess && (
      <>
        <p className="text-med text-white font-bold px-8 py-2">
          {t("Currency")}
        </p>
        <div className="flex flex-col justify-center items-start h-full p-8 space-y-4">
          <CustomInput
            readOnly
            containerStyle={"!border-primary !border-[1px]"}
            customStyle={"!text-primary font-semibold"}
            value={
              currentCurrency?.Currency_Translation?.find(
                (x) => x.Language.Code.toLowerCase() == i18n.language
              )?.Name
            }
            select
            otherOptions={currencies.ids.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                  onClick={() => {
                    dispatch(setCurrencyCR(currencies.entities[item]));
                  }}
                >
                  {
                    currencies.entities[item].Currency_Translation?.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    )?.Name
                  }
                </p>
              );
            })}
            icon={<MdExpandMore size={24} />}
            reverseIcon
          />
        </div>
      </>
    )
  );
};

export default CurrencySettings;
