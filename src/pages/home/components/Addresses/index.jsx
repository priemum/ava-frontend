import React from "react";
import addressesIcon from "../../../../assets/icons/addresses-icon.svg";
import { useGetActiveAddressQuery } from "../../../../redux/addresses/addressesSlice";
import { useTranslation } from "react-i18next";
import AddressCard from "./AddressCard";
import Loader from "../../../../components/UI/Loader";
import Slider from "react-slick";

const HomeAddresses = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetActiveAddressQuery();
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
      <div className="py-16 mt-24 px-[5%] bg-[#F4F4F4]">
        <div className="flex w-full">
          <div className="flex items-center self-start flex-1">
            <img src={addressesIcon} alt="property Icon" />
            <p className="text-small md:text-med font-bold">{t("Addresses")}</p>
          </div>
        </div>
        <div className="max-lg:hidden grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-7">
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
                  Places={data.entities[item]._count.Addresses}
                  Properties={data.entities[item]._count.Property}
                  id={item}
                />
              );
          })}
        </div>
        <Slider
          slidesToScroll={1}
          slidesToShow={2}
          arrows={false}
          dots={true}
          className="w-full lg:hidden"
          responsive={[
            {
              breakpoint: 2000,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 850,
              settings: { slidesToShow: 1 },
            },
          ]}
        >
          {data.ids.map((item, index) => {
            if (data.entities[item].addressID == null)
              return (
                <div
                  key={index}
                  className="!flex !justify-center !items-center h-full pb-5 w-full"
                >
                  <AddressCard
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
                </div>
              );
          })}
        </Slider>
      </div>
    )
  );
};

export default HomeAddresses;
