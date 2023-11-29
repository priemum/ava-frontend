import React from "react";
import { useGetActivePropertiesQuery } from "../../../redux/properties/propertiesSlice";
import Loader from "../../../components/UI/Loader";
import PropertyCard from "../../../components/UI/PropertyCard";
const PropertiesList = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActivePropertiesQuery();

  return isLoading || isFetching ? (
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
      <div className="p-8 grid grid-cols-3 gap-4 min-h-screen border-l-2">
        {data.ids.map((item, index) => {
          return <PropertyCard data={data.entities[item]} key={index} />;
        })}
      </div>
    )
  );
};

export default PropertiesList;
