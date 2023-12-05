import React from "react";
import propertyInfoIcon from "../../../assets/icons/property-info-icon.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useTranslation } from "react-i18next";

const PropertyInfo = ({ data }) => {
  const { i18n } = useTranslation();
  return (
    <div className="my-12">
      <div className="flex items-center self-start flex-1">
        <img src={propertyInfoIcon} alt="property Icon" />
        <p className="text-med font-bold">Description</p>
      </div>

      <div className="rounded-xl bg-white p-8 flex flex-col justify-start items-center">
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
        <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />
        <div className="grid grid-cols-3 gap-6 text-start w-full text-smaller">
          <p className="col-span-full font-bold">Property Information </p>
          <p className="">
            <span className="text-[#6A6A6A]">Type: </span>
            {
              data.Category.Category_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Name
            }
          </p>
          <p className="">
            <span className="text-[#6A6A6A]">Address: </span>
            {
              data.Address.Address_Translation.find(
                (x) =>
                  x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
              ).Name
            }
          </p>
          <p className="">
            <span className="text-[#6A6A6A]">Furnishing: </span>
            {data.FurnishingStatus}
          </p>
          <p className="">
            <span className="text-[#6A6A6A]">Purpose: </span>
            {data.Purpose}
          </p>
          <p className="">
            <span className="text-[#6A6A6A]">Added On: </span>
            {data.CreatedAt.split("T")[0]}
          </p>
          <p className="">
            <span className="text-[#6A6A6A]">Completion: </span>
            {data.CompletionStatus}
          </p>
          {data.Purpose == "Rent" && (
            <p className="">
              <span className="text-[#6A6A6A]">Rent Frequency: </span>
              {data.RentFrequency}
            </p>
          )}
          {data.Purpose == "Rent" && (
            <p className="">
              <span className="text-[#6A6A6A]">Minimum Number Of Checks: </span>
              {data.RentMin}
            </p>
          )}
          {data.Purpose == "Rent" && (
            <p className="">
              <span className="text-[#6A6A6A]">Maximum Number Of Checks: </span>
              {data.RentMax}
            </p>
          )}
          {data.Handover && (
            <p className="">
              <span className="text-[#6A6A6A]">Handover: </span>
              {data.Handover}
            </p>
          )}
          {data.VacantStatus && (
            <p className="">
              <span className="text-[#6A6A6A]">Vacant Status: </span>
              {data.VacantStatus}
            </p>
          )}
        </div>
        <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />
        <div className="grid grid-cols-3 gap-6 text-start w-full text-smaller">
          <p className="col-span-full font-bold">Validation Information </p>
          {data.Developer.ViewTag && (
            <p className="">
              <span className="text-[#6A6A6A]">Developer: </span>
              {
                data.Developer.Developer_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Name
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
