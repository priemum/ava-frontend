import React, { useEffect, useState } from "react";
import {
  useGetActiveAddressQuery,
  useLazyGetActiveAddressQuery,
} from "../../redux/addresses/addressesSlice";
import AddressCard from "../home/components/Addresses/AddressCard";
import Loader from "../../components/UI/Loader";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const AddressesPage = () => {
  const { addressId } = useParams();
  const [
    getActiveAddress,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetActiveAddressQuery();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [addressFullName, setAddressFullName] = useState();
  const naming = (name) => {
    data.ids.map((item) => {
      if (item == data.entities[addressId].addressID) {
        name =
          data.entities[item].Address_Translation.find(
            (x) => x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
          ).Name +
          " / " +
          name;

        if (data.entities[item].addressID == null) setAddressFullName(name);
        else naming(name);
      }
    });
  };
  useEffect(() => {
    getActiveAddress().then(() => {
      let name = data.entities[addressId].Address_Translation.find(
        (x) => x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
      ).Name;
      if (data.entities[addressId].addressID == null) {
        setAddressFullName(name);
      } else {
        naming(name);
      }
    });
  }, [addressId]);

  return isLoading || isFetching ? (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="h-screen flex flex-col justify-center items-center relative text-center">
      <p className="text-med font-bold">{t("ErrorPleaseReload")}</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-x-7 gap-y-12 my-28 px-[5%]">
        <div className="col-span-full text-med md:text-big font-bold">
          {addressFullName ??
            data.entities[addressId].Address_Translation.find(
              (x) =>
                x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
            ).Name}
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
