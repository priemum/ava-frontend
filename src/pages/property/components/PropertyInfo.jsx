import React, { useState } from "react";
import propertyInfoIcon from "../../../assets/icons/property-info-icon.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useTranslation } from "react-i18next";

const PropertyInfo = ({ data }) => {
  const { i18n, t } = useTranslation();
  const [descShowMore, setDescShowMore] = useState(false);
  return (
    <div className="my-12">
      <div className="flex items-center self-start flex-1">
        <img
          src={propertyInfoIcon}
          alt="property Icon"
          className="max-h-20 max-w-20"
        />
        <p className="text-smaller sm:text-small font-bold">
          {t("Description")}
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 lg:p-8 flex flex-col justify-start items-center">
        <div
          className={`transition-all duration-300 overflow-hidden ${
            descShowMore ? "max-h-[1000px]" : "max-h-[125px]"
          }`}
        >
          <ReactQuill
            value={
              data?.Property_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Description
            }
            readOnly={true}
            theme={"bubble"}
          />
        </div>
        <p
          className="cursor-pointer px-3 py-1 bg-buttonGrad font-bold rounded-md text-[14px] md:text-tiny my-2"
          onClick={() => setDescShowMore(!descShowMore)}
        >
          {descShowMore ? t("ShowLess") : t("ShowMore")}
        </p>
        <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-start w-full text-smaller">
          <p className="col-span-full font-bold text-smaller">
            {t("PropertyInformation")}
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("Type")}: </span>
            {
              data.Category.Category_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Name
            }
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("Address")}: </span>
            {
              data.Address.Address_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Name
            }
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("Furnishing")}: </span>
            {data.FurnishingStatus}
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("Purpose")}: </span>
            {data.Purpose}
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("AddedOn")}: </span>
            {data.CreatedAt.split("T")[0]}
          </p>
          <p className="text-tiny">
            <span className="text-[#6A6A6A]">{t("Completion")}: </span>
            {data.CompletionStatus}
          </p>
          {data.Purpose == "Rent" && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">{t("RentFrequency")}: </span>
              {data.RentFrequency}
            </p>
          )}
          {data.Purpose == "Rent" && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">{t("NumberOfChecks")}:</span>
              {" " + data.RentMin + " - " + data.RentMax}
            </p>
          )}
          {/* {data.Purpose == "Rent" && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">
                {t("MaximumNumberOfChecks")}:
              </span>
              {data.RentMax}
            </p>
          )} */}
          {data.Handover && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">{t("Handover")}: </span>
              {data.Handover}
            </p>
          )}
          {data.VacantStatus && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">{t("VacantStatus")}: </span>
              {data.VacantStatus}
            </p>
          )}
          {data.Developer.ViewTag && (
            <p className="text-tiny">
              <span className="text-[#6A6A6A]">{t("Developer")}: </span>
              {
                data.Developer.Developer_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Name
              }
            </p>
          )}
        </div>
        {/* <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />
        <div className="grid grid-cols-3 gap-6 text-start w-full text-smaller">
          <p className="col-span-full font-bold">
            {t("ValidationInformation")}
          </p>
          {data.Developer.ViewTag && (
            <p className="">
              <span className="text-[#6A6A6A]">{t("Developer")}: </span>
              {
                data.Developer.Developer_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Name
              }
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default PropertyInfo;
