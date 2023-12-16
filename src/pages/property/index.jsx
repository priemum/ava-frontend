import React, { useEffect, useState } from "react";
import ImageSlider from "./components/ImageSlider";
import { useGetPropertyByIdQuery } from "../../redux/properties/propertiesSlice";
import Loader from "../../components/UI/Loader";
import { useParams } from "react-router-dom";
import UnitSlider from "./components/UnitSlider";
import Amenities from "./components/Amenities";
import Location from "./components/Location";
import PropertyInfo from "./components/PropertyInfo";
import PaymentPlan from "./components/PaymentPlan";
import Prices from "./components/Prices";
import RegInfo from "./components/RegInfo";
import { useTranslation } from "react-i18next";
import { useGetActiveAddressQuery } from "../../redux/addresses/addressesSlice";

const PropertyPage = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetPropertyByIdQuery({ id });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { i18n, t } = useTranslation();
  const [addressPaths, setAddressPaths] = useState([]);
  const {
    data: addresses,
    isLoading: addressesIsLoading,
    isFetching: addressesIsFetching,
    isSuccess: addressesIsSuccess,
    isError: addressesIsError,
  } = useGetActiveAddressQuery();
  let names = [];
  const handleChildren = (parent, name) => {
    addresses.normalData.map((child) => {
      if (child.addressID !== null) {
        if (parent.id == child.addressID) {
          let newName =
            name +
            " / " +
            child.Address_Translation.find(
              (x) => x.Language.Code.toLowerCase() == i18n.language
            ).Name;

          if (child.Addresses.length !== 0) {
            handleChildren(child, newName);
          } else {
            names.push(newName);
          }
        }
      }
    });
  };

  useEffect(() => {
    if (isSuccess && addressesIsSuccess) {
      let parents = addresses.normalData.filter((x) => x.addressID == null);
      parents.map((parent) => {
        let name = parent.Address_Translation.find(
          (x) => x.Language.Code.toLowerCase() == i18n.language
        ).Name;
        if (parent.Addresses.length !== 0) {
          handleChildren(parent, name);
        } else {
          names.push(name);
        }
      });

      let path = names.find((x) =>
        x.includes(
          data.Address.Address_Translation.find(
            (x) => x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
          ).Name
        )
      );
      setAddressPaths(path);
    }
  }, [isSuccess, addressesIsSuccess]);
  return (
    <div className="pt-24 bg-[#F6F6F6] min-h-screen h-full">
      {isLoading || isFetching ? (
        <div className="relative h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <div className="h-screen flex justify-center items-center">
          <p className="font-bold text-med">
            Somthing Went Wrong, Please Refresh The Page
          </p>
        </div>
      ) : (
        isSuccess && (
          <div className="">
            <ImageSlider data={data.Images} />
            <div className="grid lg:grid-cols-4 mt-12">
              <div className="col-span-3 border-r-2 px-4 lg:px-8">
                <p className="font-bold text-smaller">{addressPaths}</p>
                <p className="font-bold text-med">
                  {
                    data.Property_Translation.find(
                      (x) => x.Language.Code == "En"
                    ).Name
                  }
                </p>
                <div className="flex flex-col justify-center items-center">
                  <UnitSlider
                    data={data.propertyUnits}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                  />
                  <div className="w-[95%] sm:w-[80%] grid sm:grid-cols-2 gap-4 mt-4 lg:hidden">
                    <Prices currentSlide={currentSlide} data={data} />
                    <RegInfo currentSlide={currentSlide} data={data} />
                  </div>
                </div>
                <Amenities data={data.Aminities} />
                <Location data={data} />
                <PropertyInfo data={data} />
                {data?.propertyUnits[0]?.Paymentplan.length !== 0 && (
                  <PaymentPlan
                    data={data?.propertyUnits[0]?.Paymentplan[0]}
                    unitPrice={data.propertyUnits[currentSlide].Price}
                  />
                )}
              </div>
              <div className="max-lg:hidden col-span-1 h-[700px] min-h-[40vh] px-8 sticky top-[10%] left-0 space-y-4">
                <Prices currentSlide={currentSlide} data={data} />
                <RegInfo currentSlide={currentSlide} data={data} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PropertyPage;
