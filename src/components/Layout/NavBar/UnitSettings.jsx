import React, { useState } from "react";
import { useGetActiveUnitQuery } from "../../../redux/units/unitsSlice";
import { useTranslation } from "react-i18next";
import CustomInput from "../../Forms/CustomInput";
import { MdExpandMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUnit,
  setUnitCR,
} from "../../../redux/websiteSettings.slice";
const UnitSettings = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentUnit = useSelector(selectCurrentUnit);
  const {
    data: units,
    isLoading: unitsIsLoading,
    isFetching: unitsIsFetching,
    isSuccess: unitsIsSuccess,
    isError: unitsIsError,
  } = useGetActiveUnitQuery();

  return unitsIsLoading || unitsIsFetching ? (
    <div className="flex justify-center items-center h-full">
      <p className="text-smaller"> {t("Loading")} </p>
    </div>
  ) : unitsIsError ? (
    <div className="flex justify-center items-center h-full">
      <p className="text-smaller"> {t("ErrorPleaseReload")} </p>
    </div>
  ) : (
    unitsIsSuccess && (
      <>
        <p className="text-med text-white font-bold px-8 py-2">{t("Units")}</p>
        <div className="flex flex-col justify-start items-center h-full p-8 space-y-4">
          <CustomInput
            readOnly
            containerStyle={"!border-white/50 !border-[1px]"}
            customStyle={"!text-white font-semibold"}
            value={
              currentUnit?.Unit_Translation?.find(
                (x) => x.Language.Code.toLowerCase() == i18n.language
              )?.Name
            }
            select
            otherOptions={units.ids.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                  onClick={() => {
                    dispatch(setUnitCR(units.entities[item]));
                  }}
                >
                  {
                    units.entities[item].Unit_Translation?.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    )?.Name
                  }
                </p>
              );
            })}
            icon={<MdExpandMore size={24} className="text-white" />}
            reverseIcon
          />
        </div>
      </>
    )
  );
};

export default UnitSettings;
