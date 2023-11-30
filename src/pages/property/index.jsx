import React, { useState } from "react";
import ImageSlider from "./components/ImageSlider";
import { useGetPropertyByIdQuery } from "../../redux/properties/propertiesSlice";
import Loader from "../../components/UI/Loader";
import { useParams } from "react-router-dom";
import UnitSlider from "./components/UnitSlider";
import Amenities from "./components/Amenities";
import Location from "./components/Location";
import PropertyInfo from "./components/PropertyInfo";
import { FaCoins, FaAngleRight, FaAngleLeft } from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetPropertyByIdQuery({ id });
  const [currentSlide, setCurrentSlide] = useState(0);
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
            <div className="grid grid-cols-4 mt-12">
              <div className="col-span-3 border-r-2 px-8">
                <p className="font-bold text-med">
                  {
                    data.Property_Translation.find(
                      (x) => x.Language.Code == "En"
                    ).Name
                  }
                </p>
                <div className="flex justify-center items-center">
                  <UnitSlider
                    data={data.propertyUnits}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                  />
                </div>
                <Amenities data={data.Aminities} />
                <Location data={data} />
                <PropertyInfo data={data} />
              </div>
              <div className="col-span-1 h-[700px] min-h-[40vh] px-8 sticky top-[10%] left-0 ">
                <div className="bg-white shadow-xl rounded-xl p-4 space-y-2">
                  <p className="text-[#878787]">Price Of Unit</p>
                  <div className="text-primary text-med flex items-center gap-x-3">
                    <FaCoins size={24} />
                    {data.propertyUnits[currentSlide].Price}
                  </div>
                  <p className="text-[#878787]">Price Per SQFT</p>
                  <div className="text-primary text-med flex items-center gap-x-3">
                    <FaCoins size={24} />
                    {Math.round(data.propertyUnits[currentSlide].PricePerSQFT)}
                  </div>
                </div>
                <div className="bg-white shadow-xl rounded-xl p-4 mt-4 space-y-3">
                  <p className="text-smaller font-bold">
                    Regulatory Information
                  </p>
                  <p className="font-semibold">
                    <span className="text-[#6A6A6A]">Permit Number: </span>
                    {data.propertyUnits[currentSlide].PermitNumber}
                  </p>
                  <p className="font-semibold">
                    <span className="text-[#6A6A6A]">DEDNo: </span>
                    {data.propertyUnits[currentSlide].DEDNo}
                  </p>
                  <p className="font-semibold">
                    <span className="text-[#6A6A6A]">ReraNo: </span>
                    {data.ReraNo}
                  </p>
                  <p className="font-semibold">
                    <span className="text-[#6A6A6A]">Permit Number: </span>
                    {data.propertyUnits[currentSlide].PermitNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PropertyPage;
