import React, { useEffect } from "react";
import { useGetActiveAddressQuery } from "../../redux/addresses/addressesSlice";
import AddressCard from "../home/components/Addresses/AddressCard";
import Loader from "../../components/UI/Loader";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const AddressesPage = () => {
  const { addressId } = useParams();
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetActiveAddressQuery();
  const { t, i18n } = useTranslation();

  return isLoading || isFetching ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="my-24 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">{t("ErrorPleaseReload")}</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-7 my-28 px-[5%]">
        <div className="col-span-full text-med md:text-big font-bold">
          {
            data.entities[addressId].Address_Translation.find(
              (x) =>
                x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
            ).Name
          }
        </div>
        {data.ids.map((item, index) => {
          if (data.entities[item].addressID == addressId)
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
                Places={data.entities[item]._count.Addresses}
                Properties={data.entities[item]._count.Property}
                id={item}
              />
            );
        })}
      </div>
    )
  );
};

export default AddressesPage;
