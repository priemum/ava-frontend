import React from "react";
import addressesIcon from "../../../../assets/icons/addresses-icon.svg";
import { useGetActiveAddressQuery } from "../../../../redux/addresses/addressesSlice";
import { useTranslation } from "react-i18next";
import AddressCard from "./AddressCard";

const HomeAddresses = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveAddressQuery();
  return (
    isSuccess && (
      <div className="py-16 mt-24 px-[5%] bg-[#F4F4F4]">
        <div className="flex w-full">
          <div className="flex items-center self-start flex-1">
            <img src={addressesIcon} alt="property Icon" />
            <p className="text-med font-bold">{t("Addresses")}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 place-items-center gap-7">
          {data.ids.map((item, index) => {
            if (data.entities[item].addressID == null)
              return (
                <AddressCard
                  key={index}
                  Name={
                    data.entities[item].Address_Translation.find(
                      (x) =>
                        x.Language.Code.toLowerCase() ==
                        i18n.language.toLowerCase()
                    ).Name
                  }
                  Latitude={data.entities[item].Latitude}
                  Longitude={data.entities[item].Longitude}
                  Image={data.entities[item].Image.URL}
                  Places={data.entities[item].Addresses.length}
                />
              );
          })}
        </div>
      </div>
    )
  );
};

export default HomeAddresses;
