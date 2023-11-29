import React from "react";
import ImageSlider from "./components/ImageSlider";
import { useGetPropertyByIdQuery } from "../../redux/properties/propertiesSlice";
import Loader from "../../components/UI/Loader";
import { useParams } from "react-router-dom";
import UnitSlider from "./components/UnitSlider";
import Amenities from "./components/Amenities";
import Location from "./components/Location";
const PropertyPage = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetPropertyByIdQuery({ id });
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
          <div className="mx-8">
            <ImageSlider data={data.Images} />
            <div className="grid grid-cols-4 mt-12">
              <div className="col-span-3">
                <p className="font-bold text-med">
                  {
                    data.Property_Translation.find(
                      (x) => x.Language.Code == "En"
                    ).Name
                  }
                </p>
                <UnitSlider data={data.propertyUnits} />
                <Amenities data={data.Aminities} />
                <Location data={data} />
              </div>
              <div className="col-span-1 border-l-2 h-full min-h-[40vh]">
                side Info
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PropertyPage;
